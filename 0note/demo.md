## 
1. Login
    + Login sai mật khẩu
    + Login đúng mật khẩu.

2. Xem danh sách sách.
    + Xem chi tiết.


3. Nhập sách
    - Xem danh sách
        + Lọc
            * Tìm tất cả
            * Lọc theo ID
            * Lọc theo ngày nhập
            * Lọc theo thời gian (tháng trong năm)
            * Lọc theo khoảng thời gian (từ ngày ... đến ngày ...)

        + PHÂN TRANG: THEO AJAX
            * Số dòng: Tất cả, 5, 10, 20, 50.
        + Chọn chế độ sắp xếp trước khi search.
        + Sắp xếp theo cột sau khi search
        + In

    - Xem chi tiết: 
        + Xem danh sách chi tiết
        + PHÂN TRANG: THEO AJAX
            * Số dòng: Tất cả, 5, 10, 20, 50.    
        + Có giá ngày nhập, tổng tiền nhập.
        + In




    - Thêm
        + Nhập ISBN của sách và nhấn add
            * Nếu ISBN đã tồn tại thì table sẽ hiển thị thêm 1 dòng.
            * Nếu ISBN trùng với ISBN trong table thì sẽ báo lỗi.
            * Nếu ISBN chưa từng tồn tại thì sẽ hiển thị modal tạo sách mới.
        + Xóa book đã chọn. (Nhấn vào nút delete có biểu tượng thùng rác)
        + Ngày nhập mặc định là ngày hiện tại.
        + Giá tổng cộng sẽ được cập nhập mỗi lần thêm/xóa dòng trong table.

        + Thêm sách khi ISBN chưa từng tồn tại:
            * Nhập thông của sách trong modal
            * Chọn tác giả trong Authors.
                * * Nếu tác giả chừa từng tồn tại thì sẽ hiển thị modal thông báo và xác nhận thêm tác giả mới
            * Chọn danh mục trong Authors.
                * * Nếu danh mục chừa từng tồn tại thì sẽ hiển thị modal thông báo và xác nhận thêm tác giả mới

            * Chọn nhà xuất bản trong modal.
                * * Nếu nhà xuất bản chừa từng tồn tại thì yêu cầu thêm mới.

            * Luôn kiểm tra các thông tin đã nhập đầy đủ thì hệ web mới cho phép thêm, ngược lại báo lỗi.

        + Lưu ý:
            * Quy định: Số lượng sách nhập ít nhất là 150 (Quy định này có thể được sử dụng hoặc không; Có thể thay đổi giá trị)
            * Chỉ nhập các đầu sách có lượng tồn ít hơn 300 (Quy định này có thể được sử dụng hoặc không; Có thể thay đổi giá trị)

    




    
4. Bán sách
    - Xem danh sách
        + Lọc
            * Tìm tất cả
            * Lọc theo ID
            * Lọc theo số điện thoại khách hàng
            * Lọc theo ngày nhập
            * Lọc theo thời gian (tháng trong năm)
            * Lọc theo khoảng thời gian (từ ngày ... đến ngày ...)

        + PHÂN TRANG: THEO AJAX
            * Số dòng: Tất cả, 5, 10, 20, 50.
        + Chọn chế độ sắp xếp trước khi search.
        + Sắp xếp theo cột sau khi search
        + In

    - Xem chi tiết: 
        + Xem danh sách chi tiết
        + PHÂN TRANG: THEO AJAX
            * Số dòng: Tất cả, 5, 10, 20, 50.    
        + Có giá ngày nhập, tổng tiền nhập.
        + In


    - Thêm
        + Nhập ISBN của sách và nhấn add
            * Nếu ISBN đã tồn tại thì table sẽ hiển thị thêm 1 dòng.
            * Nếu ISBN chưa từng tồn tại hoặc sách ngừng bán thì sẽ hiển thị modal thông báo.
        + Xóa book đã chọn. (Nhấn vào nút delete có biểu tượng thùng rác)
        + Ngày bán mặc định là ngày hiện tại.
        + Giá tổng cộng sẽ được cập nhập mỗi lần thêm/xóa dòng trong table.

        + Nhập số điện thoại khách hàng.
            * Nếu số không tồn tại thì yêu cầu nhập khách hàng mới

        + Lưu ý:
            * Quy định: Chỉ bán cho khách hàng không nơ quá 20000 (Quy định này có thể được sử dụng hoặc không; Có thể thay đổi giá trị)
            * Số lượng sách tồn sau khi bán ít nhất là 20 (Quy định này có thể được sử dụng hoặc không; Có thể thay đổi giá trị)
            

5. Lập hóa đơn trả tiền.

6. Xem quy định
    + Thay đổi quy định














3. Xem danh sách khách hàng
    + Chỉnh sửa
    + Tìm kiếm    
    + Export ra excel

4. Xem danh sách admin/staff
    +     




## Lỗi

- Book:
    + Chưa update
    + Chưa xóa

- Customer:
    + Admin: ko thêm được


- Thêm danh mục trong import add bị lỗi ko (thêm cái nào cũng kênh bị trùng)


- Import:
    + Page
        + Ngôn ngữ
        + Defaut date và date sau khi filter của time state

- Sale:
    + Filter by customer: đã fix