# ☕ TinKhùng Coffee & Tea

Website đặt món (cà phê · trà · đồ ăn) tĩnh, chạy hoàn toàn bằng HTML/CSS/JS — không cần server. Giỏ hàng lưu trong `localStorage` của trình duyệt.

## Trang
- `index.html` — Trang chủ (hero, giới thiệu, danh mục, món nổi bật)
- `nuoc.html` — Menu nước
- `do-an.html` — Menu đồ ăn
- `gio-hang.html` — Giỏ hàng + thanh toán (QR demo)

## Thư mục
- `assets/style.css` — giao diện dùng chung (phong cách quán cà phê ấm cúng)
- `assets/cart.js` — xử lý giỏ hàng (thêm món, hiệu ứng bay vào giỏ, badge, toast)

## Chạy thử
Mở `index.html` bằng trình duyệt, hoặc xem bản online qua GitHub Pages.

## Tuỳ chỉnh
- Đổi/thêm món: sửa thẻ `<article class="product-card" data-name="..." data-price="..." data-icon="...">` trong `nuoc.html` / `do-an.html`.
- Đổi màu/giao diện: sửa biến màu ở đầu `assets/style.css` (`:root`).
- Thông tin liên hệ: sửa phần `<footer>` trong các trang.

---
Dựng lại &amp; làm đẹp từ ý tưởng "quán nước" ban đầu.
