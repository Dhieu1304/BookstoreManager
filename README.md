# BookstoreManager

### install: 
    npm i

### run:
    npm run dev

    - Thêm dữ liệu vào DB (Nếu chưa thêm): 
  insert into account (id, email, password, first_name, last_name, gender, phone_number, address, avatar, uid, role, status) values (default, 'd.hieu.13.04@gmail.com', '$2b$10$K6uzgtaGcTmsOy/GQGklHuVr3JxXAdbGB5XrQEFO3IghF0rG4HYiC', 'Nguyễn Đình', 'Hiệu', 'Male', '0378945612', '227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh', 'https://i.pinimg.com/550x/7f/e0/81/7fe081ce0b5b88171bb279866f2ac99a.jpg', '2d7beea6-ccac-11ec-9d64-0242ac120002', 'superadmin', 'active');
    - Đăng nhập bằng: 
        - email: d.hieu.13.04@gmail.com
        - password: 123456
- Copy toàn bộ .env.example sang .env và điền các thông tin cần thiết
- Sử dụng DB onl bằng cách sửa NODE_ENV=/PRODUCTION thành NODE_ENV=PRODUCTION
