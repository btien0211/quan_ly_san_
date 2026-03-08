const slotGrid = document.getElementById('timeSlotGrid');
const bookingDateInput = document.getElementById('bookingDate');

// Hàm 1: Lấy dữ liệu từ Server và hiển thị lên giao diện
async function loadSlots() {
    const selectedDate = bookingDateInput.value;
    
    try {
        // Gọi API lấy danh sách khung giờ (Ví dụ từ 6h đến 22h)
        const response = await fetch(`/api/slots?date=${selectedDate}`);
        const data = await response.json();

        slotGrid.innerHTML = ''; // Xóa sạch lưới cũ trước khi vẽ mới

        data.slots.forEach(slot => {
            const div = document.createElement('div');
            // Gán class dựa trên trạng thái 'booked' từ database trả về
            div.className = `slot ${slot.isBooked ? 'booked' : 'available'}`;
            div.innerHTML = `
                <div>${slot.time}</div>
                <small>${slot.isBooked ? 'Đã đặt' : 'Còn trống'}</small>
            `;

            if (!slot.isBooked) {
                div.onclick = () => handleBooking(slot.id, slot.time);
            }
            slotGrid.appendChild(div);
        });
    } catch (error) {
        console.error("Lỗi khi tải lịch:", error);
    }
}

// Hàm 2: Xử lý khi khách nhấn vào đặt sân
async function handleBooking(slotId, time) {
    const confirmApprove = confirm(`Nhi muốn đặt sân vào khung giờ ${time} chứ?`);
    
    if (confirmApprove) {
        const payload = {
            field_id: 1, // Mặc định sân 1
            booking_date: bookingDateInput.value,
            slot_id: slotId
        };

        const response = await fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        alert(result.message);
        
        // Sau khi đặt xong, gọi lại hàm loadSlots để cập nhật màu đỏ ngay lập tức
        loadSlots(); 
    }
}

// Lắng nghe sự kiện thay đổi ngày
bookingDateInput.addEventListener('change', loadSlots);

// Chạy lần đầu tiên khi mở trang
window.onload = loadSlots;