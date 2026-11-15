# TEAM-CRAFT: SIMULATOR — Phiên Bản V5

Webgame mô phỏng kỹ năng làm việc nhóm dành cho sinh viên, phong cách **Cozy Isometric / Paper-Craft / Casual Mobile Game**.

---

## 🌟 Điểm Nâng Cấp Nổi Bật Trên Phiên Bản V5

### 1. Hệ Thống Nhân Vật Đồng Bộ & Tự Do Lựa Chọn Diện Mạo
- **Chọn nhân vật ban đầu**: Người chơi có thể tự do chọn:
  - **Nam Sinh (Boy)**: Nhiệt huyết, năng động, phong thái đĩnh đạc.
  - **Nữ Sinh (Girl)**: Tóc dài buộc hai bên, kẹp hoa pastel xinh xắn, chu đáo, tinh tế.
  - **Bé Mèo (Cat)**: Cute, nhanh nhẹn, tò mò và sáng tạo.
  - **Bé Thỏ (Rabbit)**: Hiền lành, biết lắng nghe và cẩn thận.
  - **Bé Gấu (Bear)**: Điềm tĩnh, ấm áp, vững chãi và đáng tin cậy.
  - **Bé Ếch (Frog)**: Vui vẻ, lạc quan, mắt tròn xoe tràn đầy năng lượng tích cực.
- **Tính độc lập tuyệt đối**: Diện mạo/giới tính và vai trò gameplay (Leader, Doer, QC, Mediator, Active Follower) hoàn toàn độc lập. Bạn có thể là Nữ Sinh hoặc Bé Mèo làm Trưởng nhóm Leader!
- Người chơi có thể đổi lại diện mạo bất cứ lúc nào trong mục **Tùy chỉnh nhân vật**.

### 2. Bộ 10 Trạng Thái Biểu Cảm Chibi Chi Tiết
Không sử dụng emoji đè lên mặt. Toàn bộ nhân vật được trang bị hệ thống biểu cảm chuẩn layer SVG:
- `idle`: Đứng yên, phong thái tự nhiên.
- `walk`: Hoạt họa đi bộ với hai khung `walk_a` và `walk_b`.
- `talk`: Miệng mở nói chuyện theo nhịp câu thoại.
- `happy`: Mắt cười tít hình trăng khuyết, miệng cười tươi, má hồng rực rỡ, ánh sao vàng lấp lánh.
- `sad`: Lông mày xuôi, mắt cụp xuống ươn ướt, khóe miệng trĩu xuống, giọt nước mắt lăn trên má.
- `worried`: Lông mày nhăn bối rối, miệng run lượn sóng, giọt mồ hôi lo lắng trên thái dương.
- `angry`: Lông mày xếch nhọn quyết liệt, mắt trợn sắc, miệng nghiến răng, ký hiệu gân đỏ bùng cháy.
- `confused`: Một mày nhướn cao một mày hạ thấp, miệng lệch nghiêng, dấu hỏi `?` xoay nghiêng ngơ ngác.
- `surprised`: Mắt mở to tròn xoe long lanh, miệng chữ O kinh ngạc, dấu chấm than `!`.
- `embarrassed`: Má đỏ ửng kèm vạch kẻ ngượng ngùng, mắt nhìn tránh sang bên, giọt mồ hôi gượng gạo.

### 3. Cửa Hàng Đồng Phục ĐHQGHN & Kinh Tế Trong Game
- **200 Xu khởi đầu**: Số Xu và điểm Thấu cảm ❤️ được quản lý bằng 2 biến hoàn toàn độc lập.
- **Danh mục trang phục chính thức V5**:
  | Trang phục | Giá | Nhận diện & Nguồn gốc |
  | :--- | :---: | :--- |
  | **VNU Cơ Bản** | 0 xu | Đồng phục ĐHQGHN màu xanh lá truyền thống, sở hữu mặc định. |
  | **ULIS Xanh Navy** | 50 xu | Áo polo xanh dương đậm, nhận diện Đại học Ngoại ngữ ULIS. |
  | **UET Công Nghệ** | 50 xu | Áo trắng phối xanh năng động, nhận diện ĐH Công nghệ UET. |
  | **UEB Đỏ Đô** | 50 xu | Áo polo đỏ đô lịch lãm, phong cách Trường ĐH Kinh tế UEB. |
  | **SIS Liên Ngành** | 50 xu | Xanh navy phối vàng kim, Trường Khoa học liên ngành & Nghệ thuật SIS. |
  | **Giáng Sinh Ấm** | 100 xu | Áo đỏ viền tuyết trắng mùa đông lễ hội Noel. |
  | **Halloween Bí Ngô** | 100 xu | Tím huyền bí phối cam bí ngô lễ hội hóa trang. |
- **Cơ chế mua**: Xem trước trực quan trên nhân vật đang chọn, trừ xu chính xác 1 lần, mở khóa vĩnh viễn trong dữ liệu người chơi, mặc hoặc tháo không mất thêm xu.

### 4. Phân Loại Chuẩn 5 Tình Huống Chat & 22 Tình Huống Bàn Tròn
- **5 Tình huống Chat** (Giao diện tin nhắn nhóm mô phỏng):
  - Ải 1: Màn 1 (1:0 - Mải nói chuyện quên làm bài), Màn 4 (1:3 - Nhờ làm hộ phần việc).
  - Ải 2: Màn 1 (2:0 - Nhóm chat băng giá), Màn 2 (2:1 - Thành viên tàng hình), Màn 6 (2:5 - Bạo lực ngôn từ).
- **22 Tình huống Bàn Tròn** (Giao diện thảo luận trực tiếp quanh bàn):
  - Ải 1: Màn 2 (1:1), Màn 3 (1:2), Màn 5 (1:4).
  - Ải 2: Màn 3 (2:2), Màn 4 (2:3), Màn 5 (2:4).
  - Các Ải 3, 4, 5 khi cập nhật.

### 5. Giao Diện Bàn Tròn Nâng Cấp V5
- Bối cảnh quán nước sân trường với sàn gỗ, ánh nắng mai và bàn tròn trung tâm.
- 5 thành viên ngồi quanh bàn (Leader, Doer, QC, Mediator, Bạn thân / Follower).
- Bong bóng thoại có đuôi chỉ thẳng vào người nói, hiển thị chữ dạng máy chữ (Typewriter).
- Thành viên đang phát biểu sáng bừng (`is-speaking`) với quầng sáng spotlight và tag tên nổi bật, các thành viên khác mờ nhẹ (`is-dimmed`).
- Đồng hồ đếm ngược **60 giây / lượt** (chuẩn hóa từ 120s xuống 60s), chuyển sang nhấp nháy đỏ cảnh báo khi còn dưới 15 giây.

### 6. Luồng Phản Ứng -> Polaroid -> Scrapbook Result -> Lesson Unlocked
Mỗi lựa chọn của người chơi kích hoạt một chuỗi trải nghiệm đầy cảm xúc:
1. **Phản hồi tức thì**: NPC lên tiếng phản hồi câu thoại của bạn, các thành viên quanh bàn đồng loạt chuyển đổi biểu cảm khuôn mặt tương ứng.
2. **Camera Flash**: Hiệu ứng chớp sáng máy ảnh ghi lại khoảnh khắc cao trào.
3. **Polaroid Card**: Tấm ảnh chụp khoảnh khắc phản ứng của cả nhóm quanh bàn tròn xuất hiện sống động.
4. **Scrapbook Result (Sổ Lưu Niệm & Phân Tích Nguyên Nhân)**:
   - Tấm ảnh Polaroid nghiêng góc -3.2deg kẹp bên góc sổ.
   - Thẻ notecard kẻ dòng với hàng lỗ đục gáy sổ (`scrapbook-ring-dot`).
   - 4 mục phân tích chuyên sâu:
     - 📘 **Diễn biến**: Tình tiết xảy ra sau khi đưa ra quyết định.
     - 🎯 **Kết quả**: Tác động tức thì tới tiến độ và tinh thần nhóm.
     - 🌟 **Nguyên nhân tích cực**: Điểm sáng trong cách ứng xử.
     - ⚠️ **Nguyên nhân hạn chế & Lưu ý**: Rủi ro và bài học kinh nghiệm.
5. **Lesson Unlocked & Ví Kịch Bản**: Mở khóa bài học đúc kết và lưu mẫu tin nhắn thực chiến vào ví.

### 7. Hiệu Ứng Kịch Tính (Dramatic Effects)
- Hiệu ứng rung màn hình (`screenShake`) khi xảy ra tranh cãi lớn hoặc chọn phương án tiêu cực.
- Ký hiệu bốc hỏa tức giận, giọt mồ hôi bối rối, vệt nước mắt buồn bã.
- Tuân thủ chuẩn trợ năng `@media (prefers-reduced-motion: reduce)`.

---

## 🚀 Hướng Dẫn Chạy Game

### Phương án 1: Chạy trực tiếp file standalone (Khuyên dùng)
Mở file `demo-standalone.html` (hoặc `demo-offline.html`) bằng bất kỳ trình duyệt hiện đại nào (Chrome, Edge, Firefox, Safari). Không cần cài đặt web server hay Node.js.

### Phương án 2: Chạy qua HTTP Server
```powershell
python -m http.server 5500
```
Truy cập `http://localhost:5500`.

### Cập nhật file standalone khi chỉnh sửa code
```powershell
node build-standalone.mjs
```

---

## 📁 Cấu Trúc Thư Mục Dự Án
- `index.html`: Điểm khởi đầu chính của webgame (ES module).
- `styles.css`: Toàn bộ định dạng giao diện, hiệu ứng hoạt họa và bố cục Bàn tròn, Polaroid, Scrapbook.
- `app.js`: Logic điều hướng, quản lý nhân vật, trang phục, cửa hàng, đồng hồ 60s, roundtable engine.
- `data.js`: Dữ liệu 5 vai trò, 6 loại nhân vật, 7 bộ đồng phục VNU, kịch bản 11 màn hoàn chỉnh với NPC reaction & expressions.
- `assets/characters/`: Bộ sưu tập sprite SVG cho 5 vai trò, nhân vật nữ, các mascot và các bộ trang phục ĐHQGHN với 10 biểu cảm.
- `assets/ui/`: Bộ icon SVG đồng bộ.
- `assets/campus-map.webp`: Bản đồ khuôn viên trường học isometric.
- `build-standalone.mjs`: Script tự động biên dịch toàn bộ source thành 1 file standalone độc lập.
- `gen-v5-outfits.mjs`: Script sinh đồng phục trường học chuẩn V5.
- `gen-expressions.mjs`: Script sinh 10 trạng thái biểu cảm chuẩn SVG.
- `gen-avatars.mjs`: Script sinh nhân vật Nữ và Mascot chibi.
