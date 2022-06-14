
const billService = require('../services/billService');


exports.getBillPage = async (req, res) => {

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
        filterMaxDate : data.filterMaxDate
    }





    // const billsAndCount = await billReceiptService.getAndCountAllBills(page, limit, filter, true);

    // if(!billsAndCount){
    //     res.render('bill/billPage', {title: 'Bill'});
    // }

    // const bills = billsAndCount.rows;
    // const count = billsAndCount.count;

    // const pagination = {
    //     page: page,
    //     limit: limit,
    //     totalRows: count
    // }

    // res.render('bill/billPage', {title: 'Bill', bills, pagination, filter});
    res.render('bill/billPage', {title: 'Bill'});
}



exports.getBillAddPage = (req, res) => {
    res.render('bill/billAddPage', {title: 'Bill Add Page'});
}


exports.getBillDetailPage = async (req, res) => {


    // const billId = req.params.id;

    // const billReceipt = await billReceiptService.getBillReceiptById(billId, true);

    // // const bookIds = await billReceiptDetailService.getBookIdsByBillReceiptId(billId, true)

    // // const bookStocks = await bookStockService.getAllBookStocksByBookIds(bookIds, false);

    // const billReceiptDetails = await billReceiptDetailService.getAllBillReceiptDetailsByBillReceiptId(billId, false);

    // res.render('bill/billDetailPage', {title: 'billDetailPage', billReceipt, billReceiptDetails});
    res.render('bill/billDetailPage', {title: 'billDetailPage'});
}

exports.addBill = async (req, res) => {

    const data = req.body;

    // Test
    const createAt = new Date();
    const customerId  = data.id;
    const money = data.money;

    const bill = billService.addBill(createAt, customerId, money);

    res.redirect('/bill');

}
