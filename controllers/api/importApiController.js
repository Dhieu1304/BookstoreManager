const importReceiptService = require("../../services/importReceiptService");
const excelJS = require("exceljs");


exports.getAllImportReceipts = async (req, res) => {


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

    const importReceiptsAndCount = await importReceiptService.getAndCountAllImportReceipts(page, limit, filter, true);
    const importReceipts = importReceiptsAndCount.rows;
    const count = importReceiptsAndCount.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.json({importReceipts, pagination});
}


exports.exportImportReceipts = async (req, res) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Imports");

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





    const importReceiptsAndCount = await importReceiptService.getAndCountAllImportReceipts(page, limit, filter, true);

    if(!importReceiptsAndCount){
        res.render('import/importPage', {title: 'Import'});
    }

    const importReceipts = importReceiptsAndCount.rows;
    const count = importReceiptsAndCount.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    // res.render('import/importPage', {title: 'Import', importReceipts, pagination, filter});

    worksheet.columns = [
        {header: "No.", key: "s_no", width: 7},
        {header: "ID.", key: "id", width: 7},
        {header: "Time", key: "create_at", width: 20},
        {header: "Total Cost", key: "price", width: 20},
        {header: "Number of books", key: "count_details", width: 30},
        {header: "Count of book", key: "sum_quantity", width: 15},
    ];


    let counter = 1;


    //Cách này không hay lắm nhưng tạm thời chưa dùng được key "import_receipt_details.count_details" ở trên
    importReceipts.forEach((importReceipt) => {
        importReceipt.s_no = counter;
        importReceipt.count_details = importReceipt.import_receipt_details.count_details;
        importReceipt.sum_quantity = importReceipt.import_receipt_details.sum_quantity;
        worksheet.addRow(importReceipt);
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
        res.setHeader("Content-Disposition", `attachment; filename=export-importReceipts.xlsx`);

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

