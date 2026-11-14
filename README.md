# TEAM-CRAFT: SIMULATOR — V4 (Quiz ID Cards + Design Branches)

## Cách chạy (Windows / PowerShell)

```powershell
cd "<đường dẫn đến thư mục teamcraft-v4>"
py -m http.server 5500
```

Mở http://localhost:5500. Nhấn `Ctrl + C` để dừng.

Hoặc mở `demo-standalone.html` trực tiếp bằng Chrome/Edge: tất cả SVG/ảnh và mã đã được đóng gói để không phải cài npm.

## Tính năng mới trong V4

- **Quiz 5 câu / 60 giây** dẫn tới **7 kiểu thẻ kết quả vui nhộn** đúng cấu trúc đề xuất.
- **Thẻ kết quả dạng giấy phép/ID** nền caro pastel, linh vật riêng, danh hiệu, player ID tùy chỉnh, ngày cấp, dấu mộc retro, lời khuyên.
- **Xuất PNG chất lượng 900 x 1190** bằng Canvas; **chia sẻ ảnh** bằng API chia sẻ gốc trên thiết bị có hỗ trợ; nếu không hỗ trợ, web tự tải PNG để đăng Story thủ công.
- **Bộ sưu tập 7 kiểu thẻ** trên trang chủ để xem thử không cần làm Quiz.
- Nút **Nhập vai** và **Tùy chỉnh** trên từng vai trò.
- Ải 1–2: **Thẻ bối cảnh** trước khi bắt đầu hội thoại.
- Danh sách **27 tình huống** được giữ từ tab đề xuất; mỗi màn có thẻ minh họa dạng Polaroid, phân biệt chat nhóm/làm việc trực tiếp khi có thông tin trong nhánh thiết kế.
- Giữ bản đồ 5 ải, tư thế nhân vật, gameplay mẫu Ải 1 / Ải 2, Role Reversal và Lesson Unlocked từ V3.

## Những phần *chưa* được mô tả là hoàn thành

- 25 tình huống còn lại hiện là tên/mô tả cảnh và thẻ khung; **chưa có hội thoại, nhánh quyết định và ending đầy đủ**.
- Bộ 5 vai có tên và giao diện nhưng chỉ các vai được hỗ trợ trong MVP có nội dung chơi.
- Chưa có backend, tài khoản trường học, Teacher Dashboard, thanh toán, database hay kết nối tuyển dụng.
- Chia sẻ trực tiếp lên Instagram/Facebook/TikTok phụ thuộc hỗ trợ của hệ điều hành và trình duyệt; không thể bắt ứng dụng đó tự mở Story bằng API web phổ thông.

## Mã nguồn

- `index.html`: entry
- `styles.css`: giao diện desktop/mobile
- `data.js`: toàn bộ vai trò, 27 tình huống và nội dung kịch bản demo
- `app.js`: điều hướng, Quiz, game và sự kiện giao diện
- `persona-card.js`: vẽ thẻ bằng Canvas và dùng cùng bản vẽ để xuất ảnh
- `assets/personas/*.svg`: 7 linh vật SVG độc lập
- `assets/characters/*.svg`: sprites nhân vật trong game
- `assets/ui/*.svg`: icon
- `assets/campus-map.webp`: nền bản đồ
- `DOCS-COVERAGE.md`: đối chiếu các nhánh trong Google Docs

## Quyền riêng tư

Tên trên thẻ là biệt danh nhập tự nguyện, không yêu cầu tên thật hoặc ngày sinh. Quiz phục vụ giải trí, không được dùng như một phép đo EQ/năng lực tâm lý.
