const User = require('../models/userModel');

exports.registerUser = (req, res) => {
    const { full_name, phone, password } = req.body;

    User.create({ full_name, phone, password }, (err, result) => {
        if (err) {
            // Nếu khách nhập số điện thoại đã có người dùng
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: "Số điện thoại này đã được đăng ký!" });
            }
            return res.status(500).json({ message: "Lỗi hệ thống!" });
        }
        res.status(201).json({ message: "Đăng ký tài khoản thành công!" });
    });
};
// ... (Hàm registerUser cũ giữ nguyên)

// Xử lý khi khách hàng Đăng nhập
exports.loginUser = (req, res) => {
    const { phone, password } = req.body;

    User.login(phone, password, (err, results) => {
        if (err) return res.status(500).json({ message: "Lỗi hệ thống!" });

        if (results.length > 0) {
            // Đăng nhập đúng -> Trả về thông tin khách hàng
            res.status(200).json({ 
                message: "Đăng nhập thành công!", 
                user: results[0] 
            });
        } else {
            // Sai mật khẩu hoặc sđt
            res.status(401).json({ message: "Sai số điện thoại hoặc mật khẩu!" });
        }
    });
};