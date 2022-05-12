# BookstoreManager

### install: 
    npm i

### run:
    npm run dev

## <font color='red'>* NOTE  !important</font>
**Something change from Dhieu**

- Hiện tại đã bỏ xác thực người dùng mới vào đc web để mn tiện làm các phần khác, muốn ktra thì:
    - Bỏ cmt ở /*authController.checkAuthenticated*/ trong file initRouter
    - Thêm dữ liệu vào DB: insert into account (id, email, password, first_name, last_name, gender, phone_number, address, avatar, uid, role, status) values (default, 'd.hieu.13.04@gmail.com', '$2b$10$K6uzgtaGcTmsOy/GQGklHuVr3JxXAdbGB5XrQEFO3IghF0rG4HYiC', 'Nguyễn Đình', 'Hiệu', 'Male', '0378945612', '227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh', 'https://i.pinimg.com/550x/7f/e0/81/7fe081ce0b5b88171bb279866f2ac99a.jpg', '2d7beea6-ccac-11ec-9d64-0242ac120002', 'superadmin', 'active');
    - Đăng nhập bằng: 
        - email: d.hieu.13.04@gmail.com
        - password: 123456

- Có thêm multer (upload file), muốn dùng thì lấy ở utils/multer.js
- Có thêm pagination (phân trang), muốn dùng thì lấy ở /js/pagination/pagination.js
- Có thêm notification (thông báo giống toast), muốn dùng thì gọi hàm: notification("message", NOTY_TYPE.FAIL); (FAIL/SUCCESS/INFO) >>Đã thêm ở layout, chỉ dùng thôi
- Cấu hình hbs ở config/configHbs (muốn cấu hình gì thì thêm vào :3)


## Tham khảo (Sang)
https://stackoverflow.com/questions/18796221/creating-a-select-box-with-a-search-option

https://devdreamz.com/question/866287-accessing-handlebars-variable-inside-client-js-file