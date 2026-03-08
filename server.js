const express = require('express');
const path = require('path');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Cấu hình để đọc được dữ liệu JSON từ phía Frontend gửi lên
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình thư mục chứa file tĩnh (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng các Routes đã định nghĩa
app.use('/api', bookingRoutes);

// Trả về giao diện chính khi vào trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});
// Kéo Controller của User vào
const userController = require('./controllers/userController');

// Mở trang giao diện Đăng ký
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});
// Mở trang Đăng nhập
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
// Xử lý API Đăng nhập
app.post('/api/login', userController.loginUser);
// Xử lý khi khách hàng bấm nút "Đăng ký"
app.post('/api/register', userController.registerUser);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});