const saleReceiptService = require("../../services/saleReceiptService");
const excelJS = require("exceljs");
const saleReceiptDetailService = require("../../services/saleReceiptDetailService");


exports.getAllSaleReceipts = async (req, res) => {


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
        filterMaxDate : data.filterMaxDate
    }


    const saleReceiptsAndCount = await saleReceiptService.getAndCountAllSaleReceipts(page, limit, filter, true);
    const saleReceipts = saleReceiptsAndCount.rows;
    const count = saleReceiptsAndCount.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.json({saleReceipts, pagination});
}


exports.exportSaleReceipts = async (req, res) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sales");

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





    const saleReceiptsAndCount = await saleReceiptService.getAndCountAllSaleReceipts(page, limit, filter, true);

    if(!saleReceiptsAndCount){
        res.render('sale/salePage', {title: 'Sale'});
    }

    const saleReceipts = saleReceiptsAndCount.rows;
    const count = saleReceiptsAndCount.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    // res.render('sale/salePage', {title: 'Sale', saleReceipts, pagination, filter});

    worksheet.columns = [
        {header: "No.", key: "s_no", width: 7},
        {header: "ID.", key: "id", width: 7},
        {header: "Time", key: "create_at", width: 20},
        {header: "Total Cost", key: "price", width: 20},
        {header: "Number of books", key: "count_details", width: 30},
        {header: "Count of book", key: "sum_quantity", width: 15},
    ];


    let counter = 1;


    //Cách này không hay lắm nhưng tạm thời chưa dùng được key "sale_receipt_details.count_details" ở trên
    saleReceipts.forEach((saleReceipt) => {
        saleReceipt.s_no = counter;
        saleReceipt.count_details = saleReceipt.sale_receipt_details.count_details;
        saleReceipt.sum_quantity = saleReceipt.sale_receipt_details.sum_quantity;
        worksheet.addRow(saleReceipt);
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
        res.setHeader("Content-Disposition", `attachment; filename=export-saleReceipts.xlsx`);

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



exports.getSaleDetailById = async (req, res) => {


    const saleId = req.params.id;

    const data = req.query;
    const page = data.page || 1;
    const limit = data.limit || 10;

    // const saleReceipt = await saleReceiptService.getSaleReceiptById(saleId, true);


    const saleReceiptDetailsAndCount = await saleReceiptDetailService.getAllSaleReceiptDetailsBySaleReceiptId(saleId, page, limit, false);

    const saleReceiptDetails = saleReceiptDetailsAndCount.rows;
    const count = saleReceiptDetailsAndCount.count;


    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }


    res.json({saleReceiptDetails, pagination});
    // res.render('sale/saleDetailPage', {title: 'saleDetailPage', saleReceipt, saleReceiptDetails, pagination});
}


exports.exportSaleReceiptDetails = async (req, res) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sales");

    const data = req.query;
    const page = data.page || 1;
    const limit = data.limit || 10;


    const saleId = req.params.id;

    const saleReceiptDetailsAndCount = await saleReceiptDetailService.getAllSaleReceiptDetailsBySaleReceiptId(saleId, page, limit, false);

    const saleReceiptDetails = saleReceiptDetailsAndCount.rows;
    const count = saleReceiptDetailsAndCount.count;


    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    // res.render('sale/salePage', {title: 'Sale', saleReceipts, pagination, filter});

    worksheet.columns = [
        {header: "No.", key: "s_no", width: 7},
        {header: "ISBN", key: "isbn", width: 20},
        {header: "Title", key: "title", width: 20},
        {header: "Price", key: "price", width: 20},
        {header: "Quantity", key: "quantity", width: 30},
    ];


    let counter = 1;


    saleReceiptDetails.forEach((saleReceipDetail) => {
        saleReceipDetail.s_no = counter;
        saleReceipDetail.isbn = saleReceipDetail.book.isbn;
        saleReceipDetail.title = saleReceipDetail.book.title;
        worksheet.addRow(saleReceipDetail);
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
        res.setHeader("Content-Disposition", `attachment; filename=export-saleReceipts.xlsx`);

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