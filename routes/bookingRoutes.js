const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
router.get('/slots', bookingController.getSlots);

// Gửi yêu cầu đặt sân
router.post('/book', bookingController.bookField);
router.get('/revenue', bookingController.getRevenue);
// Thống kê doanh thu Tuần/Tháng
router.get('/revenue/weekly', bookingController.getWeeklyRevenue);
router.get('/revenue/monthly', bookingController.getMonthlyRevenue);
module.exports = router;