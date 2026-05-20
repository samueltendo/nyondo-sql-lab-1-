const Database = require('better-sqlite3');

const db = new Database('nyondo_stock.db');

// Create products table
db.exec(`
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL
)
`);

// Insert products
const insertProduct = db.prepare(
    'INSERT INTO products (name, description, price) VALUES (?, ?, ?)'
);

const insertProducts = db.transaction((products) => {
    for (const p of products) {
        insertProduct.run(...p);
    }
});

insertProducts([
    ['Cement (bag)', 'Portland cement 50kg bag', 35000],
    ['Iron Sheet 3m', 'Gauge 30 roofing sheet 3m long', 110000],
    ['Paint 5L', 'Exterior wall paint white 5L', 60000],
    ['Nails 1kg', 'Common wire nails 1kg pack', 12000],
    ['Timber 2x4', 'Pine timber plank 2x4 per metre', 25000],
]);

// Create users table
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'attendant'
)
`);

// Insert users
const insertUser = db.prepare(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)'
);

const insertUsers = db.transaction((users) => {
    for (const u of users) {
        insertUser.run(...u);
    }
});

insertUsers([
    ['admin', 'admin123', 'admin'],
    ['fatuma', 'pass456', 'attendant'],
    ['wasswa', 'pass789', 'manager']
]);

// Show products
const rows = db.prepare('SELECT * FROM products').all();

console.log("PRODUCTS");
console.log(rows);

// Show users
const users = db.prepare('SELECT * FROM users').all();

console.log("\nUSERS");
console.log(users);