const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Tên user MySQL của Nhi (mặc định là root)
    password: '',      // Mật khẩu MySQL của Nhi (để trống nếu không có)
    database: 'quan ly san banh'
});

db.connect((err) => {
    if (err) throw err;
    console.log('✅ Đã kết nối MySQL thành công!');
});

module.exports = db;