const saleReceiptService = require("../../services/saleReceiptService");


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