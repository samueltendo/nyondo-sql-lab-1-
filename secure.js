const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');
// TODO: rewrite using ? placeholder - never use template literals in SQL
function searchProductSafe(name) {
// your code here
}
function loginSafe(username, password) {
// your code here
}
// These must ALL return undefined or [] when you run them
console.log('Test 1:', searchProductSafe("' OR 1=1--"));
console.log('Test 2:', searchProductSafe("' UNION SELECT id,username,password,role FROM
users--"));
console.log('Test 3:', loginSafe("admin'--", 'anything'));
console.log('Test 4:', loginSafe("' OR '1'='1", "' OR '1'='1"))