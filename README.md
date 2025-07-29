# SportShop - Website bán hàng trực tuyến thể thao

Website bán hàng trực tuyến chuyên về quần áo thể thao được xây dựng hoàn toàn bằng HTML, CSS, JavaScript thuần (không sử dụng framework).

## Tính năng chính

### ✅ Đã hoàn thành
- **Trang chủ** với header, navigation, banner, lưới sản phẩm và footer
- **20+ sản phẩm thể thao** mẫu (áo, quần, giày, phụ kiện) từ các thương hiệu nổi tiếng
- **Tìm kiếm và lọc** theo tên, danh mục, thương hiệu, giá
- **Giỏ hàng** với chọn size, số lượng, tính tổng, mã giảm giá
- **Đăng ký/Đăng nhập** với quản lý session bằng localStorage
- **Chi tiết sản phẩm** với hình ảnh, mô tả, chọn size, đánh giá
- **Thanh toán** với form thông tin khách hàng và phương thức thanh toán
- **Quản lý đơn hàng** với lịch sử, trạng thái, chi tiết đơn hàng
- **Trang cá nhân** với chỉnh sửa thông tin và đổi mật khẩu
- **Responsive design** tương thích mobile và desktop

### 🎨 Thiết kế
- Màu sắc chủ đạo: xanh dương (#2c5aa0), trắng, xám
- Font hiện đại, dễ đọc (Segoe UI)
- Layout clean, professional với hiệu ứng hover và animation
- Icons Font Awesome
- Responsive với breakpoints chuẩn

### 💾 Lưu trữ dữ liệu
- **localStorage** cho giỏ hàng, thông tin người dùng, đơn hàng
- Không cần server hoặc database
- Dữ liệu được lưu trữ local trên trình duyệt

## Cấu trúc file

```
/
├── index.html              # Trang chủ
├── login.html              # Đăng nhập  
├── register.html           # Đăng ký
├── product-detail.html     # Chi tiết sản phẩm
├── cart.html              # Giỏ hàng
├── checkout.html          # Thanh toán
├── orders.html            # Quản lý đơn hàng
├── profile.html           # Trang cá nhân
├── css/
│   └── style.css          # CSS chính với responsive design
├── js/
│   ├── main.js            # JavaScript chính cho trang chủ
│   ├── products.js        # Dữ liệu và quản lý sản phẩm
│   ├── cart.js           # Quản lý giỏ hàng
│   ├── auth.js           # Hệ thống xác thực
│   └── orders.js         # Quản lý đơn hàng
└── README.md
```

## Dữ liệu sản phẩm mẫu

Website chứa 20+ sản phẩm thể thao bao gồm:
- **Áo thể thao**: Nike Dri-FIT, Adidas 3-Stripes, Puma DryCELL, Under Armour HeatGear
- **Quần thể thao**: Short, legging, jogger, quần dài từ các thương hiệu nổi tiếng
- **Giày thể thao**: Nike Air Zoom, Adidas Ultraboost, Nike Air Force 1, Under Armour HOVR
- **Phụ kiện**: Mũ, tất, băng đô, túi, găng tay

Mỗi sản phẩm có đầy đủ thông tin: ID, tên, mô tả, giá, hình ảnh, danh mục, thương hiệu, sizes, đánh giá.

## Cách chạy

1. **Mở trực tiếp**: Mở file `index.html` trong trình duyệt
2. **Sử dụng HTTP server** (khuyến nghị):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   
   # Live Server (VS Code extension)
   ```
3. Truy cập `http://localhost:8000`

## Tính năng chi tiết

### 🛍️ Mua sắm
- Duyệt sản phẩm theo danh mục
- Tìm kiếm thông minh
- Lọc theo giá, thương hiệu
- Chọn size và số lượng
- Thêm vào giỏ hàng với animation

### 👤 Tài khoản người dùng
- Đăng ký với validation form
- Đăng nhập với session management
- Chỉnh sửa thông tin cá nhân
- Đổi mật khẩu bảo mật
- Quản lý đơn hàng cá nhân

### 🛒 Giỏ hàng & Thanh toán
- Quản lý sản phẩm trong giỏ
- Tăng/giảm số lượng
- Áp dụng mã giảm giá
- Tính phí vận chuyển
- Form thanh toán đầy đủ
- Nhiều phương thức thanh toán

### 📦 Quản lý đơn hàng
- Lịch sử đơn hàng với phân trang
- Trạng thái đơn hàng realtime
- Chi tiết từng đơn hàng
- Tracking number
- Có thể hủy đơn/đặt lại

## Công nghệ sử dụng

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Animations, Media Queries
- **JavaScript ES6+**: Classes, Modules, Arrow Functions
- **localStorage**: Client-side storage
- **Font Awesome**: Icons
- **Responsive Design**: Mobile-first approach

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

**Lưu ý**: Đây là project demo sử dụng localStorage để lưu trữ dữ liệu. Trong môi trường production, cần sử dụng backend và database thực.