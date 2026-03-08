const db = require('../config/db');

const User = {
    // 1. Hàm thêm khách hàng mới vào database (Dành cho Đăng ký)
    create: (userData, callback) => {
        const query = `INSERT INTO users (full_name, phone, password) VALUES (?, ?, ?)`;
        db.query(query, [userData.full_name, userData.phone, userData.password], callback);
    },

    // 2. Hàm kiểm tra thông tin Đăng nhập
    login: (phone, password, callback) => {
        // Truy vấn xem có tài khoản nào khớp cả số điện thoại và mật khẩu không
        // Chỉ lấy ra id, full_name và phone (không lấy password ra ngoài để bảo mật)
        const query = `SELECT id, full_name, phone FROM users WHERE phone = ? AND password = ?`;
        
        db.query(query, [phone, password], callback);
    }
};

module.exports = User;