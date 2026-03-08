const Booking = require('../models/bookingModel');
const db = require('../config/db');
// --- THÊM HÀM NÀY VÀO ---
exports.getSlots = (req, res) => {
    const { date } = req.query;
    const fieldId = 1; // Giả định sân số 1

    // Gọi Model để lấy danh sách đã đặt trong ngày
    Booking.checkAvailabilityByDate(fieldId, date, (err, results) => {
        if (err) return res.status(500).json({ error: "Lỗi lấy dữ liệu" });

        // Tạo danh sách khung giờ mẫu (Ví dụ từ 6h đến 9h)
        const allSlots = [
            { id: 1, time: "06:00 - 07:30" },
            { id: 2, time: "07:30 - 09:00" },
            { id: 3, time: "17:00 - 18:30" }
        ];

        // Kiểm tra xem khung giờ nào đã có trong kết quả database (đã đặt)
        const finalSlots = allSlots.map(slot => {
            const isBooked = results.some(b => b.slot_id === slot.id);
            return { ...slot, isBooked: isBooked };
        });

        res.json({ slots: finalSlots });
    });
};

// Xử lý khi khách bấm nút Đặt sân
exports.bookField = (req, res) => {
    const { field_id, booking_date, slot_id } = req.body;

    // 1. Đi hỏi MySQL xem sân khách chọn giá bao nhiêu tiền
    db.query('SELECT price_per_slot FROM fields WHERE id = ?', [field_id], (err, fields) => {
        if (err || fields.length === 0) {
            return res.status(500).json({ error: "Không tìm thấy giá của loại sân này!" });
        }

        const price = fields[0].price_per_slot;

        // 2. Gói thông tin đặt sân kèm theo giá tiền
        const newBooking = {
            field_id: field_id,
            booking_date: booking_date,
            slot_id: slot_id,
            status: 'confirmed',
            price_at_booking: price // Lưu giá tiền vào hóa đơn
        };

        // 3. Cất vào Database
        Booking.create(newBooking, (err, result) => {
            if (err) {
                console.log("LỖI MYSQL KHI ĐẶT SÂN:", err); // In lỗi ra màn hình đen để dễ tìm bệnh
                return res.status(500).json({ error: "Đặt sân thất bại do lỗi Database!" });
            }
            res.status(201).json({ message: "Đặt sân thành công!" });
        });
    });
};
exports.getRevenue = (req, res) => {
    Booking.getRevenue((err, results) => {
        if (err) return res.status(500).json({ error: "Lỗi lấy thống kê doanh thu" });
        res.json(results);
    });
};
// Thống kê doanh thu theo Tuần
exports.getWeeklyRevenue = (req, res) => {
    Booking.getWeeklyRevenue((err, results) => {
        if (err) return res.status(500).json({ error: "Lỗi lấy thống kê tuần" });
        res.json(results);
    });
};

// Thống kê doanh thu theo Tháng
exports.getMonthlyRevenue = (req, res) => {
    Booking.getMonthlyRevenue((err, results) => {
        if (err) return res.status(500).json({ error: "Lỗi lấy thống kê tháng" });
        res.json(results);
    });
};