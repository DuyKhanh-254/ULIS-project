# TEAM-CRAFT: SIMULATOR — UI Redesign V3

Bản demo webgame phong cách **isometric / paper-craft**, làm lại theo ảnh tham chiếu và các phần mô tả UI trong tài liệu dự án TEAM-CRAFT.

## Thay đổi so với bản trước
- Thay ảnh bản đồ cũ bằng một **bối cảnh isometric mới không có NPC, nhãn ải hoặc nút giao diện in sẵn**. NPC và các nút được bố trí độc lập, tránh lỗi chồng hai lớp hình.
- Trang chủ và các màn chơi đồng nhất màu sắc, kiểu nút, icon SVG, nhân vật chibi hình khối.
- Nhân vật được tách thành 4 pose: `idle`, `walk_a`, `walk_b`, `talk` (sẵn sàng cho animation về sau).
- Nhân vật và outfit tách riêng để mở rộng; có 5 trang phục màu sắc khác nhau theo role.
- Giữ luồng thao tác: Trang chủ → Quiz / Bản đồ → Chọn vai trò → Chọn ải → Màn chơi chat → Kết cục → Role Reversal / Lesson Unlocked / Ví kịch bản.

## Chạy ngay không cần cài đặt
**Phương án 1:** mở file `demo-standalone.html` bằng Chrome/Edge. File này đã nhúng CSS, JS và toàn bộ ảnh cần thiết; không cần cài phần mềm khác.

**Phương án 2 (source dễ sửa):** mở Terminal tại thư mục chứa file `index.html`, chạy:

```powershell
python -m http.server 5500
```

Sau đó truy cập http://localhost:5500

Nếu lệnh Python không nhận, thử `py -m http.server 5500`.

## Cấu trúc
- `index.html`: entry point (ES modules)
- `styles.css`: thiết kế giao diện
- `app.js`: điều hướng, lựa chọn, trạng thái trò chơi
- `data.js`: roles, quiz, 5 ải, lời thoại và cây quyết định bản demo
- `assets/campus-map.webp`: bối cảnh trường học isometric được vẽ mới
- `assets/ui/*.svg`: bộ icon đồng bộ
- `assets/characters/*.svg`: sprites nhân vật và outfit theo vai trò, tách pose
- `demo-standalone.html`: một file HTML mở trực tiếp
- `preview-*.png`: ảnh chụp màn hình kiểm thử

## Phạm vi đã làm
- Hoàn thiện mẫu UI với trang chủ, quiz 5 câu, kết quả quiz, bản đồ 5 ải, chọn vai trò, thay outfit, danh sách màn, chat và kết cục.
- Gameplay tương tác cho **màn đầu tiên của Ải 1 và Ải 2** theo các role MVP. Trong Ải 1 / Leader có 3 nhánh đầu và 6 kết cục, có Role Reversal mẫu.
- Tình huống còn lại chỉ có tên/mô tả/màn preview, chưa có kịch bản thoại đầy đủ.
- Dữ liệu lưu bằng localStorage cho mục đích demo, chưa có backend, tài khoản, thanh toán, Teacher Dashboard hay chức năng xã hội thật.
- Các hình ảnh nhân vật trong game là asset riêng; bản đồ nền là hình raster WebP. Để có camera 3D thật thì cần một lộ trình đồ họa khác.

## Kiểm thử
Đã kiểm thử giao diện và luồng tương tác qua trình duyệt ở kích thước 360×740, 390×844 và 430×900. Không phát hiện lỗi JavaScript trong các luồng đã thử (không phải bảo đảm không còn lỗi ở mọi trình duyệt).
