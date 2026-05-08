// queries.js
const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db'); // Connect to your existing database

console.log("=== Query A: Get every column of every product ===");
const queryA = db.prepare('SELECT * FROM products').all();
console.table(queryA);

console.log("\n=== Query B: Get only the name and price of all products ===");
const queryB = db.prepare('SELECT name, price FROM products').all();
console.table(queryB);

console.log("\n=== Query C: Get full details of the product with id = 3 ===");
const queryC = db.prepare('SELECT * FROM products WHERE id = 3').get();
console.log(queryC);

console.log("\n=== Query D: Find all products whose name contains 'sheet' ===");
const queryD = db.prepare("SELECT * FROM products WHERE name LIKE '%sheet%'").all();
console.table(queryD);

console.log("\n=== Query E: Get all products sorted by price, highest first ===");
const queryE = db.prepare('SELECT * FROM products ORDER BY price DESC').all();
console.table(queryE);

console.log("\n=== Query F: Get only the 2 most expensive products ===");
const queryF = db.prepare('SELECT * FROM products ORDER BY price DESC LIMIT 2').all();
console.table(queryF);

console.log("\n=== Query G: Update price of Cement (id=1) to 38,000 and confirm ===");
// First, update the price 
db.prepare('UPDATE products SET price = 38000 WHERE id = 1').run();
// Then, SELECT to confirm it worked
const queryG = db.prepare('SELECT * FROM products WHERE id = 1').get();
console.log(queryG);