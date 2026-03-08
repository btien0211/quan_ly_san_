const db = require('../config/db'); // Kết nối MySQL

const Booking = {
    // Kiểm tra xem sân đã được đặt vào ngày và khung giờ đó chưa
    checkAvailability: (fieldId, date, slotId, callback) => {
        const query = `SELECT * FROM bookings 
                       WHERE field_id = ? AND booking_date = ? 
                       AND slot_id = ? AND status != 'cancelled'`;
        db.query(query, [fieldId, date, slotId], callback);
    },
    // Tạo đơn đặt sân mới (có lưu kèm giá tiền)
    create: (bookingData, callback) => {
        const query = `INSERT INTO bookings (field_id, booking_date, slot_id, status, price_at_booking) VALUES (?, ?, ?, ?, ?)`;
        db.query(query, [
            bookingData.field_id, 
            bookingData.booking_date, 
            bookingData.slot_id, 
            bookingData.status, 
            bookingData.price_at_booking // <--- Truyền tiền vào đây
        ], callback);
    },
    // Thêm vào trong đối tượng Booking = { ... }
    checkAvailabilityByDate: (fieldId, date, callback) => {
    const query = `SELECT slot_id FROM bookings 
                   WHERE field_id = ? AND booking_date = ? 
                   AND status != 'cancelled'`;
    db.query(query, [fieldId, date], callback);
},
    // Thống kê doanh thu theo Tháng
    getMonthlyRevenue: (callback) => {
        const query = `
            SELECT DATE_FORMAT(booking_date, '%m/%Y') AS label, SUM(price_at_booking) AS total 
            FROM bookings GROUP BY label ORDER BY booking_date ASC`;
        db.query(query, callback);
    },

    // Thống kê doanh thu theo Tuần
    getWeeklyRevenue: (callback) => {
        const query = `
            SELECT DATE_FORMAT(booking_date, 'Tuần %u/%Y') AS label, SUM(price_at_booking) AS total 
            FROM bookings GROUP BY label ORDER BY booking_date ASC`;
        db.query(query, callback);
    }
}; 
module.exports = Booking;