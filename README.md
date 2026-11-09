# Chronicles of Cosmic Relics – Biên Niên Ký Di Tích Vũ Trụ

NASA Space Apps Challenge – *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*

Game giáo dục: người chơi là Robot Cứu hộ Di sản, tìm các thiết bị NASA để lại trên **Mặt Trăng (9)**, **Sao Hỏa (8)** và **Không gian sâu (4)** theo tọa độ thật, phục hồi chúng qua mini-game (lau bụi, căn ăng-ten, sửa mạch logic) và câu đố, rồi thắp sáng chúng trên Bản đồ Di sản. Song ngữ Việt/Anh.

An educational game: the player is a Heritage Recovery Robot that finds NASA hardware left on the Moon, Mars and in deep space at real coordinates, restores it through mini-games and quizzes, and lights it up on a Heritage Map. Vietnamese/English.

## Chạy game / Run

- **Web:** mở `dist/cosmic-relics.html` bằng trình duyệt (Chrome, Edge, Safari, Firefox). Không cần cài đặt.
- **Android:** cài `dist/ChroniclesOfCosmicRelics.apk` (Android 7.0+, chạy offline).

## Tái tạo kết quả / Reproduce the build

```bash
python3 tools/build.py          # -> dist/cosmic-relics.html
python3 tools/build.py --apk    # -> dist/ChroniclesOfCosmicRelics.apk
```

Bản web chỉ cần Python 3. Bản APK cần thêm Java 17+, Node.js/npm và kết nối internet tới github.com và registry.npmjs.org (script tự tải Apktool, uber-apk-signer và font). APK được ký bằng chứng chỉ debug (đủ để cài và trình diễn, không dùng để đăng Google Play).

The web build needs only Python 3. The APK build also needs Java 17+, Node.js/npm and internet access; the script downloads its tools automatically.

## Cấu trúc mã nguồn / Source layout

| Đường dẫn | Nội dung |
|---|---|
| `src/shell.html` | Giao diện HTML + CSS |
| `src/data.js` | Dữ liệu 21 di tích (tọa độ, ngày, sự kiện, câu đố), địa danh, danh sách sao |
| `src/game.js` | Song ngữ, định dạng tọa độ, tạo địa hình, vẽ biểu tượng thiết bị |
| `src/game2.js` | Bản đồ, điều khiển robot, 3 mini-game, câu đố, hội thoại, Bản đồ Di sản |
| `android/` | Vỏ ứng dụng Android: manifest, Activity WebView (smali), biểu tượng |
| `tools/build.py` | Script build web và APK |

Game viết bằng HTML/CSS/JavaScript thuần (Canvas 2D, Web Audio). **Không dùng mô hình AI/ML, mô hình pre-trained, hay huấn luyện mô hình nào; không có thư viện JavaScript bên ngoài.**

Built with plain HTML/CSS/JavaScript. **No AI/ML or pre-trained models, no model training, no external JavaScript libraries.**

## Khai báo minh bạch / Transparency declaration

### Thư viện, công cụ và tài nguyên bên thứ ba / Third-party tools and assets

| Tên | Phiên bản | Dùng để | Nguồn | Giấy phép |
|---|---|---|---|---|
| Be Vietnam Pro (font) | @fontsource 5.3.0 | Chữ nội dung | https://fonts.google.com/specimen/Be+Vietnam+Pro · https://github.com/fontsource/fontsource | SIL Open Font License 1.1 |
| Chakra Petch (font) | @fontsource 5.3.0 | Chữ tiêu đề | https://fonts.google.com/specimen/Chakra+Petch · https://github.com/fontsource/fontsource | SIL Open Font License 1.1 |
| Apktool | 2.10.0 | Đóng gói APK (chỉ lúc build) | https://github.com/iBotPeaches/Apktool | Apache 2.0 |
| uber-apk-signer | 1.3.0 | Căn chỉnh và ký APK (chỉ lúc build) | https://github.com/patrickfav/uber-apk-signer | Apache 2.0 |

Mô hình pre-trained: **không sử dụng**.

### Dữ liệu / Data

- **Không có tập dữ liệu do BTC cung cấp** được dùng trong dự án này.
- Thông tin sứ mệnh (ngày phóng/hạ cánh, tọa độ, sự kiện khoa học) là **dữ liệu công khai của NASA**, tham chiếu theo:
  - NASA Space Science Data Coordinated Archive (NSSDCA) – https://nssdc.gsfc.nasa.gov
  - NASA Science – Solar System Exploration – https://science.nasa.gov/solar-system
  - NASA Mars Exploration – https://science.nasa.gov/mars
  - Lunar Reconnaissance Orbiter Camera (Apollo & Surveyor sites) – https://lroc.sese.asu.edu
  - NASA History – Apollo Lunar Surface Journal – https://www.nasa.gov/history
  - NASA Eyes on the Solar System / Voyager mission status – https://science.nasa.gov/mission/voyager
- Vị trí các sao sáng: tọa độ xích kinh/xích vĩ (J2000) công khai, làm tròn.
- Bản đồ địa hình trong game là **hình minh họa tạo bằng thuật toán** (procedural); các vùng biển, hố, núi lửa và di tích được đặt theo tọa độ thật. Không dùng ảnh hay mô hình 3D của bên thứ ba.

### Công cụ AI hỗ trợ / AI assistance

<!-- ĐỘI THI ĐIỀN / KIỂM TRA PHẦN NÀY CHO ĐÚNG THỰC TẾ -->
- Ý tưởng, cốt truyện, cơ chế chơi và kịch bản hội thoại mẫu: **đội thi** (tài liệu ý tưởng v6).
- Mã nguồn và phần tổng hợp dữ liệu được tạo với sự hỗ trợ của trợ lý AI **Claude (Anthropic)**, dựa trên tài liệu ý tưởng của đội. Claude là công cụ hỗ trợ viết mã; nó không phải mô hình được tích hợp hay chạy bên trong game.
- Phần đội tự thực hiện / kiểm chứng: *[đội điền: ví dụ kiểm tra lại dữ kiện với trang NASA, chơi thử, chỉnh sửa nội dung…]*

## Giấy phép / License

MIT
