const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// --- 1. Products Table (From Task 1) ---
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL
  )
`);

const insertProduct = db.prepare('INSERT INTO products (name, description, price) VALUES (?, ?, ?)');
const products = [
    ['Cement (bag)', 'Portland cement 50kg bag', 35000],
    ['Iron Sheet 3m', 'Gauge 30 roofing sheet 3m long', 110000],
    ['Paint 5L', 'Exterior wall paint white 5L', 60000],
    ['Nails 1kg', 'Common wire nails 1kg pack', 12000],
    ['Timber 2x4', 'Pine timber plank 2x4 per metre', 25000]
];

db.transaction((rows) => {
    for (const r of rows) insertProduct.run(...r);
})(products);

// --- 2. Users Table (Newly Added for Task 3) --- 
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'attendant'
  );

  INSERT OR IGNORE INTO users (username, password, role) VALUES
  ('admin', 'admin123', 'admin'),
  ('fatuma', 'pass456', 'attendant'),
  ('wasswa', 'pass789', 'manager');
`);

console.log("Setup Complete: Products and Users are ready!");

// Show everything to confirm
const allProducts = db.prepare('SELECT * FROM products').all();
const allUsers = db.prepare('SELECT * FROM users').all();
console.log("Products:", allProducts);
console.log("Users:", allUsers);