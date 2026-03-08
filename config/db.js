const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'bilgjypkrmepeymz8fud',
    user: 'u9bf0kz7eyyplsns',
    password: '1YC058CFKG7OV0obl9NK',
    database: 'bilgjypkrmepeymz8fud'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Đã kết nối MySQL thành công!');
});

module.exports = db;

