const importReceiptService = require("../../services/importReceiptService");


exports.getAllImportReceipts = async (req, res) => {

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const importReceiptsAndCount = await importReceiptService.getAndCountAllImportReceipts(page, limit, true);
    const importReceipts = importReceiptsAndCount.rows;
    const count = importReceiptsAndCount.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.json({importReceipts, pagination});
}