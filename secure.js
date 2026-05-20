const Database = require('better-sqlite3');

const db = new Database('nyondo_stock.db');

function validName(name) {

    if (typeof name !== 'string') {
        return false;
    }

    if (name.length < 2) {
        return false;
    }

    if (
        name.includes('<') ||
        name.includes('>') ||
        name.includes(';')
    ) {
        return false;
    }

    return true;
}

function validUsername(username) {

    if (typeof username !== 'string') {
        return false;
    }

    if (username.trim() === '') {
        return false;
    }

    if (username.includes(' ')) {
        return false;
    }

    return true;
}

function validPassword(password) {

    if (typeof password !== 'string') {
        return false;
    }

    if (password.length < 6) {
        return false;
    }

    return true;
}

function searchProductSafe(name) {

    if (!validName(name)) {
        console.log('Invalid product name');
        return null;
    }

    const query =
        'SELECT * FROM products WHERE name LIKE ?';

    return db.prepare(query).all(`%${name}%`);
}

function loginSafe(username, password) {

    if (!validUsername(username)) {
        console.log('Invalid username');
        return null;
    }

    if (!validPassword(password)) {
        console.log('Invalid password');
        return null;
    }

    const query =
        'SELECT * FROM users WHERE username=? AND password=?';

    return db.prepare(query).get(username, password);
}


// TESTS
console.log(
    searchProductSafe('cement')
);

console.log(
    searchProductSafe('')
);

console.log(
    searchProductSafe('<script>')
);

console.log(
    loginSafe('admin', 'admin123')
);

console.log(
    loginSafe('admin', 'ab')
);

console.log(
    loginSafe('ad min', 'pass123')
);