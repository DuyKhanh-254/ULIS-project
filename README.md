# TEAM-CRAFT: SIMULATOR — UI Redesign V3

Bản demo webgame phong cách **isometric / paper-craft**, làm lại theo ảnh tham chiếu và các phần mô tả UI trong tài liệu dự án TEAM-CRAFT.

## Thay đổi so với bản trước
- Thay ảnh bản đồ cũ bằng một **bối cảnh isometric mới không có NPC, nhãn ải hoặc nút giao diện in sẵn**. NPC và các nút được bố trí độc lập, tránh lỗi chồng hai lớp hình.
- Trang chủ và các màn chơi đồng nhất màu sắc, kiểu nút, icon SVG, nhân vật chibi hình khối.
- Nhân vật được tách thành 4 pose: `idle`, `walk_a`, `walk_b`, `talk` (sẵn sàng cho animation về sau).
- Nhân vật và outfit tách riêng để mở rộng; có 5 trang phục màu sắc khác nhau theo role.
- Giữ luồng thao tác: Trang chủ → Quiz / Bản đồ → Chọn vai trò → Chọn ải → Màn chơi chat → Kết cục → Role Reversal / Lesson Unlocked / Ví kịch bản.

## Chạy ngay không cần cài đặt
**Phương án 1:** mở file `demo-standalone.html` (hoặc `demo-offline.html`) bằng Chrome/Edge. File này đã nhúng CSS + JS vào một `<script>` thường (không dùng ES module nên mở bằng `file://` không bị chặn CORS); ảnh vẫn lấy theo đường dẫn tương đối tới thư mục `assets/` kế bên, nên giữ nguyên cấu trúc thư mục khi copy đi nơi khác.

⚠️ **Không sửa tay 2 file này.** Chúng được sinh tự động từ `index.html` + `styles.css` + `app.js` + `data.js` bằng script `build-standalone.mjs`, để tránh tình trạng 3 bản copy lệch nhau. Sau khi sửa code nguồn, chạy lại:
```powershell
node build-standalone.mjs
```

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
- **Toàn bộ 11 màn của Ải 1 (5 màn) và Ải 2 (6 màn)** đã có kịch bản thoại + 3 lựa chọn A/B/C + diễn biến/nguyên nhân/bài học đầy đủ, khớp tài liệu đề xuất.
- **Role Reversal theo từng màn**: mỗi màn trong số 11 màn có một kịch bản đảo vai riêng (`reversals` trong `data.js`), đứng từ góc nhìn đúng nhân vật vừa gây xung đột ở màn đó — không còn dùng chung 1-2 kịch bản đảo vai cho mọi màn như bản trước.
- **Thấu cảm ❤️ / Tiền xu 🪙 trên HUD là chỉ số thật**: tăng/giảm theo lựa chọn Tốt/Trung bình/Xấu, lưu lại qua `localStorage`, có toast báo thay đổi sau mỗi lượt chơi.
- Ải 3, 4, 5 vẫn ở màn hình "Đang phát triển / Chưa cập nhật" — đúng phạm vi MVP, chưa có kịch bản chơi được.
- Dữ liệu lưu bằng localStorage cho mục đích demo, chưa có backend, tài khoản, thanh toán, Teacher Dashboard hay chức năng xã hội thật.
- Thẻ kết quả Quiz hiện **chưa có** nút Tải ảnh/Chia sẻ (cơ chế viral loop trong đề xuất) — việc tiếp theo nên làm nếu cần đúng mục tiêu viral.
- Các hình ảnh nhân vật trong game là asset riêng; bản đồ nền là hình raster WebP. Để có camera 3D thật thì cần một lộ trình đồ họa khác.

## Shop trang phục
Trang chủ có nút **Shop** (cạnh nút Ví) để mở màn mua trang phục mới bằng Xu kiếm được khi chơi (thắng tình huống tốt/hoàn thành Ải). Có 5 trang phục miễn phí như cũ (Xanh ULIS, Hồng pastel, Xanh lá, Tím nhạt, Vàng mật ong) và **6 trang phục trả phí mới**: Cam Vitamin (150), Đỏ Nhiệt Huyết (180), Ngọc Lam Biển (220), Hồng Neon (250), Đen Cá Tính (300), Bạc Ánh Kim (350) — áp dụng cho cả 5 vai trò. Mua xong tự mặc luôn; đã sở hữu thì không bị trừ xu lần nữa; không đủ xu thì nút mua bị mờ đi. Màn "Tùy chỉnh nhân vật" hiển thị trang phục chưa mua ở trạng thái khóa (ảnh xám + giá tiền), bấm vào sẽ mở thẳng Shop.

Ảnh trang phục mới được sinh bằng `node gen-shop-outfits.mjs` — lấy đúng khung hình/tóc/quần có sẵn của từng vai trò, chỉ đổi màu áo (kỹ thuật giống hệt 5 màu gốc) để giữ đồng bộ phong cách vẽ, không cần vẽ tay từng ảnh.

## Mobile-native fixes đã áp dụng
Theo checklist của skill `mobile-native` (Emil Kowalski): gỡ hover "dính" trên cảm ứng (gate bằng `@media (hover:hover) and (pointer:fine)`), tắt flash xám/xanh khi chạm (`-webkit-tap-highlight-color:transparent`), chặn pull-to-refresh/rubber-band hijack scroll (`overscroll-behavior`), thêm phản hồi tức thời khi nhấn (`:active` trên mọi nút/thẻ chạm), `touch-action:manipulation` + `user-select:none` để tap không bị trễ hay bôi đen chữ nút, và `interactive-widget=resizes-content` cho bàn phím ảo.

## Dọn code trùng lặp
- Xoá dữ liệu chết không dùng tới: `wardrobes`, `mapNPCs` (bản legacy sai schema), `leaderTree`/`leaderEndings` (cây nhánh cũ không bao giờ được gọi tới vì `quickScenarios` luôn khớp trước).
- `demo-standalone.html` và `demo-offline.html` giờ được **sinh tự động** từ source bằng `build-standalone.mjs`, không còn là 3 bản copy tay dễ lệch nhau (bản cũ từng có lỗi tham chiếu `assets/campus-map.svg` không tồn tại).

## Kiểm thử
Đã kiểm thử giao diện và luồng tương tác qua trình duyệt ở kích thước 360×740, 390×844 và 430×900. Đã mô phỏng chạy toàn bộ luồng chơi + đảo vai bằng Node (DOM giả lập) để xác nhận không có lỗi runtime sau khi sửa. Không phát hiện lỗi JavaScript trong các luồng đã thử (không phải bảo đảm không còn lỗi ở mọi trình duyệt — các mục mobile-native như hover/tap/safe-area cần kiểm tra thêm trên điện thoại thật).