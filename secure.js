const Database = require('better-sqlite3');

const db = new Database('nyondo_stock.db');

function searchProductSafe(name) {

    const query =
        'SELECT * FROM products WHERE name LIKE ?';

    const rows =
        db.prepare(query).all(`%${name}%`);

    return rows;
}

function loginSafe(username, password) {

    const query =
        'SELECT * FROM users WHERE username=? AND password=?';

    const row =
        db.prepare(query).get(username, password);

    return row;
}

console.log(
    'Test 1:',
    searchProductSafe("' OR 1=1--")
);

console.log(
    'Test 2:',
    searchProductSafe("' UNION SELECT id,username,password,role FROM users--")
);

console.log(
    'Test 3:',
    loginSafe("admin'--", 'anything')
);

console.log(
    'Test 4:',
    loginSafe("' OR '1'='1", "' OR '1'='1")
);