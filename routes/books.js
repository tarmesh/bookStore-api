const express = require('express');
const { readData, writeData } = require('../utils/fileHandler');
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const BOOKS_FILE = './data/books.json';

router.use(auth);

// GET all books (with optional genre & pagination)
router.get('/', async (req, res) => {
  const books = await readData(BOOKS_FILE);
  let filtered = books;

  if (req.query.genre) {
    filtered = filtered.filter(b => b.genre === req.query.genre);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  res.json(paginated);
});

// GET book by ID
router.get('/:id', async (req, res) => {
  const books = await readData(BOOKS_FILE);
  const book = books.find(b => b.id === req.params.id);
  book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
});

// POST new book
router.post('/', async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  const books = await readData(BOOKS_FILE);

  const newBook = {
    id: uuidv4(),
    title,
    author,
    genre,
    publishedYear,
    userId: req.user.email
  };

  books.push(newBook);
  await writeData(BOOKS_FILE, books);
  res.status(201).json(newBook);
});

// PUT update book
router.put('/:id', async (req, res) => {
  const books = await readData(BOOKS_FILE);
  const index = books.findIndex(b => b.id === req.params.id);

  if (index === -1 || books[index].userId !== req.user.email) {
    return res.status(403).json({ message: 'Not allowed' });
  }

  books[index] = { ...books[index], ...req.body };
  await writeData(BOOKS_FILE, books);
  res.json(books[index]);
});

// DELETE book dynamically
router.delete('/:id', async (req, res) => {
  const books = await readData(BOOKS_FILE);
  const index = books.findIndex(b => b.id === req.params.id);

  if (index === -1 || books[index].userId !== req.user.email) {
    return res.status(403).json({ message: 'Not allowed' });
  }

  const removed = books.splice(index, 1);
  await writeData(BOOKS_FILE, books);
  res.json(removed[0]);
});

module.exports = router;
