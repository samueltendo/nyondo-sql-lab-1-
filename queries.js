const Database = require('better-sqlite3');

const db = new Database('nyondo_stock.db');

// Query A
console.log("\nA");
console.log(
    db.prepare('SELECT * FROM products').all()
);

// Query B
console.log("\nB");
console.log(
    db.prepare('SELECT name, price FROM products').all()
);

// Query C
console.log("\nC");
console.log(
    db.prepare('SELECT * FROM products WHERE id = 3').all()
);

// Query D
console.log("\nD");
console.log(
    db.prepare("SELECT * FROM products WHERE name LIKE '%sheet%'").all()
);

// Query E
console.log("\nE");
console.log(
    db.prepare('SELECT * FROM products ORDER BY price DESC').all()
);

// Query F
console.log("\nF");
console.log(
    db.prepare('SELECT * FROM products ORDER BY price DESC LIMIT 2').all()
);

// Query G
console.log("\nG");

db.prepare(
    'UPDATE products SET price = 38000 WHERE id = 1'
).run();

console.log(
    db.prepare('SELECT * FROM products').all()
);