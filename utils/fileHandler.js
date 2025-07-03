const fs = require('fs').promises;

const readData = async (file) => {
  try {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
};

const writeData = async (file, data) => {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
