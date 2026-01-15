# Ecommerce Shoe Store - Frontend

## 🚀 Giới thiệu dự án

Dự án là một hệ thống Website thương mại điện tử mô phỏng cửa hàng bán giày trực tuyến, được xây dựng với mục tiêu thực hành các công nghệ mới nhất trong hệ sinh thái React.

> Đây là Repository cho Frontend. Xem Repository Backend tại đây: https://github.com/b1nhan/wds-test-grOne-BE

### Các tính năng nổi bật:

- **Hệ thống sản phẩm:** Hiển thị danh sách sản phẩm, lọc theo thuộc tính và tìm kiếm nâng cao. Kèm theo các tính năng quản lý thêm/xóa/sửa sản phẩm được dành riêng cho admin
- **Hệ thống Giỏ hàng & Thanh toán:** Thêm sản phẩm, điều chỉnh số lượng, mô phỏng luồng thanh toán.
- **Lịch sử mua hàng:** Người dùng có thể xem lại các đơn hàng đã thực hiện trong trang cá nhân.
- **Xác thực & Phân quyền:**
  - **User:** Mua hàng và quản lý thông tin cá nhân.
  - **Admin:** Truy cập dashboard quản trị, quản lý kho hàng (Thêm/Sửa/Xóa sản phẩm) và theo dõi đơn hàng qua Data Table.

## 🛠 Công nghệ sử dụng (Techstack)

Dự án sử dụng các công nghệ hiện đại nhất (Edge-cutting tech):

- **Framework:** [React 19](https://react.dev/ 'null') & [Vite 7](https://vitejs.dev/ 'null')
- **Routing:** [TanStack Router](https://tanstack.com/router 'null') (File-based routing, Type-safe)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query 'null')
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/ 'null') & [Lucide React](https://lucide.dev/ 'null')
- **UI Components:** [Radix UI](https://www.radix-ui.com/ 'null') & [Shadcn/ui](https://ui.shadcn.com/ 'null') (Customized)
- **State Management:** [React Context API](https://react.dev/learn/passing-data-deeply-with-context 'null') (cho Authentication)
- **HTTP Client:** [Axios](https://axios-http.com/ 'null')
- **Table Management:** [TanStack Table](https://tanstack.com/table 'null')
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/ 'null')

## 📂 Cấu trúc thư mục

Dự án được tổ chức theo cấu trúc module hóa rõ ràng:

```
src/
├── api/             # Cấu hình Axios Client và các module gọi API theo tính năng
├── assets/          # Hình ảnh, banner và các tài nguyên tĩnh
├── components/      # Các thành phần giao diện
│   ├── ui/          # Các nguyên tử UI (Button, Input, Table...) dựa trên Radix
│   └── ...          # Components nghiệp vụ (Navbar, Footer, ProductCard...)
├── contexts/        # Quản lý state toàn cục (AuthContext)
├── hooks/           # Các Custom Hooks dùng chung
├── layouts/         # Giao diện khung cho Admin và Người dùng (MainLayout)
├── lib/             # Các hàm tiện ích (utils) xử lý logic Auth, Cart, Order
├── routes/          # Hệ thống định tuyến file-based của TanStack Router
│   ├── (app)/       # Nhóm route cho người dùng cuối
│   ├── admin/       # Nhóm route cho quản trị viên
│   └── auth/        # Nhóm route đăng nhập/đăng ký
├── styles/          # File cấu hình CSS toàn cục
└── main.jsx         # Điểm khởi đầu của ứng dụng
```

## 💻 Cài đặt và Chạy dự án

### Yêu cầu:

- **Node.js**: >= 20.x
- **Package Manager**: npm (hoặc yarn/pnpm)

### Các bước thực hiện:

1. **Clone dự án:**

   ```
   git clone https://github.com/b1nhan/wds-test-grOne-FE
   cd fe-wds-test
   ```

2. **Cài đặt thư viện:**

   ```
   npm install
   ```

3. Cấu hình biến môi trường:

   Sao chép file .env.example thành .env và cập nhật địa chỉ Backend:

   ```
   cp .env.example .env
   # Sau đó mở .env và sửa VITE_API_BASE_URL
   ```

4. **Chạy ứng dụng (Development):**

   ```
   npm run dev
   ```

   Truy cập: `http://localhost:5173`

## 📝 Lưu ý cần thiết khi test hệ thống

1. **Kiểm tra quyền truy cập (Guard Routes):**
   - Bạn không thể truy cập vào `/admin` nếu chưa đăng nhập với tài khoản có quyền `ADMIN`.
   - Nếu cố tình truy cập, hệ thống sẽ tự động điều hướng về trang Login hoặc trang chủ.

2. **Dữ liệu Mock vs API:**
   - Trong thư mục `src/api/mockData.js` có chứa dữ liệu mẫu. Nếu Backend chưa sẵn sàng, hãy kiểm tra cách `axiosClient` được cấu hình để chuyển đổi giữa dữ liệu thật và dữ liệu mock.

3. **Công cụ hỗ trợ Debug:**
   - Khi chạy ở chế độ `dev`, bạn sẽ thấy nút biểu tượng TanStack ở góc màn hình. Hãy sử dụng nó để kiểm tra **Route Tree** và các **Query Cache** của hệ thống.
