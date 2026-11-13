# Chronicles of Cosmic Relics – Biên Niên Ký Di Tích Vũ Trụ

**NASA Space Apps Challenge – *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars***

> Những cỗ máy vũ trụ đi đâu khi sứ mệnh kết thúc?
> *Where do space machines go when the mission ends?*

Game giáo dục: người chơi là Robot Cứu hộ Di sản, tìm các thiết bị NASA để lại trên **Mặt Trăng (9)**, **Sao Hỏa (8)** và **không gian sâu (4)** theo tọa độ thật, phục hồi chúng qua mini-game và câu đố, rồi thắp sáng chúng trên Bản đồ Di sản. Song ngữ Việt/Anh.

An educational game: as a Heritage Recovery Robot, find NASA hardware left on the Moon, on Mars and in deep space at its real coordinates, restore it through mini-games and quizzes, and light it up on the Heritage Map. Vietnamese/English.

## Demo

| | |
|---|---|
| ▶ **Chơi ngay trên điện thoại / máy tính (không cần cài)** | https://talahu.github.io/Chronicles-of-Cosmic-Relics/ |
| 🎬 **Video giới thiệu (30 giây)** | https://www.youtube.com/watch?v=Ae94roPpjGI |
| 📱 **Android (APK)** | [`dist/ChroniclesOfCosmicRelics.apk`](dist/ChroniclesOfCosmicRelics.apk) – Android 7.0+, chơi offline |

Trên iPhone: mở link bằng Safari → Chia sẻ → *Thêm vào MH chính*. Trên Android: Chrome → ⋮ → *Thêm vào màn hình chính*. Sau lần mở đầu tiên, game chơi được cả khi không có mạng.

## 1. Vấn đề và mục đích / Problem and purpose

Từ năm 1964 đến nay, NASA đã để lại hàng chục tàu đổ bộ, xe tự hành và tàu thăm dò trên Mặt Trăng, Sao Hỏa và ngoài không gian sâu. Mỗi thiết bị đã mang về những khám phá khoa học quan trọng, nhưng phần lớn học sinh không biết chúng nằm ở đâu và đã giúp nhân loại hiểu được gì.

**Mục đích:** biến những thiết bị "bị bỏ lại" thành câu chuyện mà học sinh tự khám phá – tìm, phục hồi và học từ chúng – để chúng *không bao giờ bị lãng quên*.

## 2. Giải pháp và cách chơi / Solution and how it works

1. **Lái robot** trên bản đồ theo kinh–vĩ độ thật; mũi tên tín hiệu chỉ di tích gần nhất và khoảng cách thật (km).
2. **Đến gần và bấm Quét** để mở hồ sơ thiết bị: tọa độ, ngày hạ cánh, trạng thái cuối, khám phá khoa học.
3. **Chơi mini-game** để phục hồi: lau bụi tấm pin mặt trời (vuốt), xoay ăng-ten về Trái Đất (kéo), sửa mạch logic AND/OR/XOR/NOT (chạm).
4. **Trả lời câu đố** để "khôi phục bộ nhớ" – mỗi câu kèm giải thích khoa học.
5. **Thắp sáng** thiết bị trên Bản đồ Di sản. Mục tiêu: phục hồi cả 21 di tích.

Tàu vẫn đang hoạt động (Curiosity, New Horizons) hiện trên bản đồ nhưng không cần cứu hộ – để học sinh phân biệt thiết bị đã ngừng và đang hoạt động.

## 3. Thiết kế giao diện và lý do / UI/UX design

- **Bầu trời đêm + ánh sáng vàng:** mỗi di tích được phục hồi phát sáng như một ngọn hải đăng – hình ảnh trung tâm của thông điệp "không bao giờ bị lãng quên".
- **Hệ thống log và hội thoại** (SYSTEM LOG, RECOVERY ROBOT, giọng thiết bị) kể chuyện theo cách người chơi đọc như nhật ký sứ mệnh.
- **Tọa độ hiển thị liên tục** để người chơi luôn gắn trò chơi với vị trí thật.
- **Thao tác chạm đơn giản** (chạm, vuốt, kéo) cho điện thoại; hỗ trợ cả chuột và bàn phím.
- **Song ngữ** để dùng được ở lớp học Việt Nam và với giám khảo quốc tế.

## 4. Dữ liệu và công nghệ / Data and technology

**Dữ liệu:** thông tin sứ mệnh (tọa độ, ngày tháng, sự kiện khoa học) là dữ liệu công khai của NASA, tổng hợp từ:
- NASA Space Science Data Coordinated Archive (NSSDCA) – https://nssdc.gsfc.nasa.gov
- NASA Science – Solar System Exploration – https://science.nasa.gov/solar-system
- NASA Mars Exploration – https://science.nasa.gov/mars
- Lunar Reconnaissance Orbiter Camera (vị trí Apollo, Surveyor) – https://lroc.sese.asu.edu
- NASA History – Apollo Lunar Surface Journal – https://www.nasa.gov/history
- Vị trí sao sáng trên bản đồ không gian sâu: tọa độ xích kinh/xích vĩ (J2000) công khai.

**Không sử dụng bộ dữ liệu nào do BTC cung cấp. Không sử dụng mô hình AI/ML, mô hình pre-trained hay huấn luyện mô hình.**

**Công nghệ:** HTML5 + CSS + JavaScript thuần (Canvas 2D, Web Audio), **không có máy chủ (backend)**. Lý do chọn:
- Một mã nguồn chạy được trên web, Android và iPhone; mở bằng một đường link, không cần cài đặt.
- Chơi offline (Progressive Web App) – phù hợp lớp học có mạng yếu.
- Không thu thập dữ liệu cá nhân của học sinh; tiến trình chỉ lưu trên máy người chơi.
- Bản đồ và hiệu ứng vẽ bằng thuật toán nên game rất nhẹ (khoảng 150 KB, chưa tính font).

## 5. Giá trị và giới hạn / Value and limitations

**Giá trị:** học thiên văn qua trải nghiệm; gắn kiến thức với vị trí thật; dùng miễn phí trên mọi thiết bị; dễ mở rộng thêm di tích (mỗi di tích là một mục dữ liệu).

**Giới hạn (nói rõ để minh bạch):**
- Địa hình trên bản đồ là **hình minh họa** tạo bằng thuật toán; chỉ vị trí biển, hố, núi lửa và di tích là theo tọa độ thật.
- Khoảng cách của Voyager và Pioneer là **ước tính năm 2026**.
- Lời "nói" của thiết bị là sáng tác để kể chuyện. Riêng câu nổi tiếng của Opportunity, game có ghi chú rằng đó là lời diễn giải của một nhà báo, không phải lời thật của rover.
- File APK được ký bằng chứng chỉ debug: đủ để cài và trình diễn, chưa phát hành trên Google Play.

## 6. Dự định tiếp theo / What's next

*[Đội kiểm tra lại cho đúng dự định thật – cần khớp với phần cuối video]*
- Địa hình thật từ dữ liệu độ cao NASA: LOLA (Mặt Trăng) và MOLA (Sao Hỏa).
- Thêm nhiều sứ mệnh và di tích.
- Chế độ lớp học cho giáo viên.

## Tái tạo kết quả / Reproduce

```bash
python3 tools/build.py            # dist/cosmic-relics.html – bản web 1 file (chỉ cần Python 3)
python3 tools/build.py --pages    # docs/ – bản web cho điện thoại (GitHub Pages, chơi offline)
python3 tools/build.py --apk      # dist/ChroniclesOfCosmicRelics.apk
python3 tools/build.py --all      # tất cả
```

`--pages` và `--apk` cần thêm Node.js/npm và internet (tự tải font từ npm); `--apk` cần thêm Java 17+ (tự tải Apktool và uber-apk-signer từ GitHub). Bật GitHub Pages: *Settings → Pages → Branch `main`, thư mục `/docs`*.

| Đường dẫn | Nội dung |
|---|---|
| `src/shell.html` | Giao diện HTML + CSS |
| `src/data.js` | Dữ liệu 21 di tích (tọa độ, ngày, sự kiện, câu đố), địa danh, danh sách sao |
| `src/game.js` | Song ngữ, định dạng tọa độ, tạo địa hình, vẽ thiết bị |
| `src/game2.js` | Bản đồ, robot, 3 mini-game, câu đố, hội thoại, Bản đồ Di sản |
| `android/` | Vỏ ứng dụng Android (manifest, Activity WebView, biểu tượng) |
| `docs/` | Bản web cho GitHub Pages (manifest, biểu tượng, service worker) |
| `dist/` | Kết quả build: bản web 1 file và APK |
| `tools/build.py` | Script build |

## Khai báo minh bạch / Transparency declaration

### Thư viện, công cụ, tài nguyên bên thứ ba

| Tên | Phiên bản | Dùng để | Nguồn | Giấy phép |
|---|---|---|---|---|
| Be Vietnam Pro (font) | @fontsource 5.3.0 | Chữ nội dung | https://github.com/fontsource/fontsource | SIL OFL 1.1 |
| Chakra Petch (font) | @fontsource 5.3.0 | Chữ tiêu đề | https://github.com/fontsource/fontsource | SIL OFL 1.1 |
| Apktool | 2.10.0 | Đóng gói APK (chỉ khi build) | https://github.com/iBotPeaches/Apktool | Apache 2.0 |
| uber-apk-signer | 1.3.0 | Ký APK (chỉ khi build) | https://github.com/patrickfav/uber-apk-signer | Apache 2.0 |

Game không dùng thư viện JavaScript bên ngoài.

### Công cụ AI hỗ trợ
- **Mã nguồn game** và phần tổng hợp dữ liệu được xây dựng với sự hỗ trợ của trợ lý AI **Claude (Anthropic)**, dựa trên tài liệu ý tưởng của đội. Claude là công cụ hỗ trợ viết mã, không phải mô hình được tích hợp trong game.
- **Video giới thiệu và video hướng dẫn** được dựng bằng công cụ tạo video của Claude, dùng ảnh chụp màn hình thật của game; nhạc nền do công cụ này tạo (nhạc gốc, không dùng bài hát có sẵn).
- **Lời dẫn tiếng Anh trong video:** Hiện tại chưa có lời dẫn bằng âm thanh.
- **Phần đội tự thực hiện:** ý tưởng, cốt truyện, cơ chế chơi và kịch bản hội thoại mẫu (tài liệu ý tưởng v6); *[đội bổ sung: kiểm chứng dữ kiện, chơi thử, chỉnh sửa…]*.

### Thành viên
Theo thể lệ Space Apps, sản phẩm và video không ghi tên, giọng nói hay hình ảnh của thành viên dưới 18 tuổi. Thông tin đội được cung cấp riêng cho Ban tổ chức.

## Giấy phép / License
MIT
