
# 📘 Bookstore REST API

This is a simple Node.js-based REST API built for managing books with authentication. It supports creating, viewing, updating, and deleting books — and also includes login and registration using JWT. All data is saved in JSON files on the local system.

---

## 🔧 Setup Instructions

Before you run the app, make sure you have Node.js installed.

### 1. Clone the repository

bash
git clone https://github.com/tarmesh/bookstore-api.git
cd bookstore-api


### 2. Install all required packages

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env` in the root of the project and add the following:

```
JWT_SECRET=your_secret_key
PORT=5000
```

You can replace `your_secret_key` with anything random.

### 4. Prepare the data folder

Make sure there’s a `data` folder containing two files:
- `users.json`
- `books.json`

Both should start with empty arrays:


json
[]


If the folder doesn't exist, create it like this:

bash
mkdir data
echo [] > data/users.json
echo [] > data/books.json


### 5. Run the server

in terminal run this command 

--  npm start


The API will be available at `http://localhost:5000`.

## 🧪 How to Test the Endpoints

You can test all the endpoints using **Postman** or **curl**. Here's how each works:

### 🟢 1. Register a New User

**POST** `/api/register`

json
{
  "email": "user@example.com",
  "password": "1234"
}


### 🟢 2. Login to Get Token

 **POST** `/api/login`
json
{
  "email": "user@example.com",
  "password": "1234"
}


The response will include a `token` which you’ll need for all book-related routes.

### 🔐 Using Authorization

For every request to `/api/books/*`, add this header:

Authorization: Bearer <your_token_here>

### 📚 3. Add a Book

**POST** `/api/books`

json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "publishedYear": 1988
}


### 📘 4. Get All Books

- **GET** `/api/books`

Optional query filters:

- By genre: `?genre=Fiction`
- Pagination: `?page=1&limit=2`

Example:
http
GET /api/books?genre=Fiction&page=1&limit=2

### 📙 5. Get Book by ID

- **GET** `/api/books/:id`

---

### ✏️ 6. Update Book

- **PUT** `/api/books/:id`

```json
{
  "title": "Updated Title"
}
```

Only the user who added the book can update it.

---

### ❌ 7. Delete Book

- **DELETE** `/api/books/:id`

Again, only the original user who added the book is allowed to delete it.

---

## 📑 API Overview

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| POST   | /api/register        | Create a new user account    |
| POST   | /api/login           | Login and receive token      |
| GET    | /api/books           | View all books               |
| GET    | /api/books/:id       | View a specific book         |
| POST   | /api/books           | Add a new book (auth needed) |
| PUT    | /api/books/:id       | Update a book (auth needed)  |
| DELETE | /api/books/:id       | Delete a book (auth needed)  |


## 👨‍💻 Developer Notes

- All book operations are protected, and users must be logged in.
- Each book is linked to the user who added it using `userId`.
- JWT tokens don’t expire unless configured to do so.
- Data is stored in flat JSON files, as per the project requirement.
- API endpoints are designed to be RESTful and follow standard HTTP methods.
- Error handling is basic and can be improved for production use.
