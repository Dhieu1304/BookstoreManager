
const billService = require("../../services/billService");
const excelJS = require("exceljs");

exports.getAllBills = async (req, res) => {



    const data = req.query;
    const page = data.page || 1;
    const limit = data.limit || 10;

    const filter = {
        typeOfFilter : data.typeOfFilter,
        filterId : data.filterId,
        filterCustomer : data.filterCustomer,
        filterDate : data.filterDate,
        filterMonth : data.filterMonth,
        filterYear : data.filterYear,
        filterMinDate : data.filterMinDate,
        filterMaxDate : data.filterMaxDate,
        orderBy : data.orderBy,
        order : data.order,
    }



    const pagination = {
        page: page,
        limit: limit,
        totalRows: 0
    }


    ///
    const billsAndCount = await billService.getAndCountAllBills(page, limit, filter, true);

    if(!billsAndCount){
        res.render('bill/billPage', {title: 'Bill', pagination});
        return;
    }

    const bills = billsAndCount.rows;
    const count = billsAndCount.count;

    pagination.totalRows = count;


    res.json({bills, pagination});
}


exports.exportBills = async (req, res) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Bills");

    const data = req.query;
    const page = data.page || 1;
    const limit = data.limit || 10;

    const filter = {
        typeOfFilter : data.typeOfFilter,
        filterId : data.filterId,
        filterDate : data.filterDate,
        filterMonth : data.filterMonth,
        filterYear : data.filterYear,
        filterMinDate : data.filterMinDate,
        filterMaxDate : data.filterMaxDate,
        orderBy : data.orderBy,
        order : data.order,
    }





    const billsAndCount = await billService.getAndCountAllBills(page, limit, filter, true);

    if(!billsAndCount){
        res.render('bill/billPage', {title: 'Bill'});
    }

    const bills = billsAndCount.rows;
    const count = billsAndCount.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    // res.render('bill/billPage', {title: 'Bill', bills, pagination, filter});

    worksheet.columns = [
        {header: "No.", key: "s_no", width: 7},
        {header: "ID.", key: "id", width: 7},
        {header: "Customer's phone", key: "customer_phone", width: 20},
        {header: "Customer's name", key: "customer_name", width: 20},
        {header: "Money", key: "money_received", width: 20},
        {header: "Time", key: "create_at", width: 20},
    ];


    let counter = 1;


    //Cách này không hay lắm nhưng tạm thời chưa dùng được key "bill__details.count_details" ở trên
    bills.forEach((bill) => {
        bill.s_no = counter;

        bill.customer_phone = bill["customer.phone"];
        bill.customer_name = bill["customer.name"];

        worksheet.addRow(bill);
        counter++;
    });

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = {bold: true};
    });

    try {
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", `attachment; filename=export-bills.xlsx`);

        return workbook.xlsx.write(res).then(() => {
            res.status(200);
        });
    } catch (err) {
        res.send({
            status: "error",
            message: "Something went wrong",
        });
    }
};



exports.exportBillDetails = async (req, res) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Bills");



    const billId = req.params.id;

    const bill = await billService.getBillById(billId, true);

    // res.render('bill/billPage', {title: 'Bill', bills, pagination, filter});

    worksheet.columns = [
        {header: "Phone", key: "customer_phone", width: 20},
        {header: "Name", key: "customer_name", width: 20},
        {header: "Email", key: "customer_email", width: 20},
        {header: "Address", key: "customer_address", width: 30},
        {header: "Money received", key: "money_received", width: 30},
    ];


// 
    bill.customer_phone = bill["customer.phone"];
    bill.customer_name = bill["customer.name"];
    bill.customer_email = bill["customer.email"];
    bill.customer_address = bill["customer.address"];


    worksheet.addRow(bill);


    worksheet.getRow(1).eachCell((cell) => {
        cell.font = {bold: true};
    });

    try {
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", `attachment; filename=export-bills.xlsx`);

        return workbook.xlsx.write(res).then(() => {
            res.status(200);
        });
    } catch (err) {
        res.send({
            status: "error",
            message: "Something went wrong",
        });
    }
};