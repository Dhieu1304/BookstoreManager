const importReceiptService = require("../../services/importReceiptService");


exports.getAllImportReceipts = async (req, res) => {


    const data = req.query;
    const page = data.page || 1;
    const limit = data.limit || 10;

    const filter = {
        typeOfFilter : data.typeOfFilter,
        filterIdIp : data.filterIdIp,
        filterDate : data.filterDate,
        filterMonth : data.filterMonth,
        filterYear : data.filterYear,
        filterMinDate : data.filterMinDate,
        filterMaxDate : data.filterMaxDate
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