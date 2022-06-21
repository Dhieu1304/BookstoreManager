
const saleReceiptService = require('../services/saleReceiptService');
const saleReceiptDetailService = require("../services/saleReceiptDetailService");
const bookStockService = require("../services/bookStockService");
const customerService = require("../services/customerService");


exports.getSalePage = async (req, res) => {


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

    res.render('sale/salePage', {title: 'Sale', saleReceipts, pagination, filter});
}

exports.getSaleAddPage = async (req, res) => {

    const bookStocks = await bookStockService.getAllBookStock(false);

    const customers = await customerService.getAllCustomerInfor(true);

    res.render('sale/saleAddPage', {title: 'Add Sale', bookStocks, customers});
}

exports.getSaleDetailPage = async (req, res) => {

    const saleId = req.params.id;

    const data = req.query;
    const page = data.page || 1;
    const limit = data.limit || 10;

    const saleReceipt = await saleReceiptService.getSaleReceiptById(saleId, false);


    const saleReceiptDetailsAndCount = await saleReceiptDetailService.getAllSaleReceiptDetailsBySaleReceiptId(saleId, page, limit, false);

    const saleReceiptDetails = saleReceiptDetailsAndCount.rows;
    const count = saleReceiptDetailsAndCount.count;


    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }


    res.render('sale/saleDetailPage', {title: 'saleDetailPage', saleReceipt, saleReceiptDetails, pagination});

}


exports.addSaleReceipt = async (req, res) => {


    const data = req.body;

    const bookIds = data.bookIds;

    const quantitys = data.quantitys;

    const customerId = data.customerId;

    const prices = data.prices;

    let totalPrice = 0;

    if(prices){
        if(Array.isArray(prices)){
            totalPrice = prices.reduce(function(acc, val) { return acc + parseInt(val); }, 0);
        }else{
            totalPrice = prices;
        }
    }

    const createAt = new Date();

    const saleReceipt = await saleReceiptService.addSaleReceipt(createAt, customerId, totalPrice);
    const saleReceiptId = saleReceipt.id;

    const saleReceiptDetailSize = bookIds.length;


    if(Array.isArray(prices)){
        for await (const p of prices) {
            const bookId = bookIds.shift();
            const quantity = quantitys.shift();
            const price = p;
            const saleReceiptDetail = await addSaleReceiptDatail(bookId, saleReceiptId, quantity, price)
        }
    }else {
        const bookId = bookIds;
        const quantity = quantitys;
        const price = prices;
        const saleReceiptDetail = await addSaleReceiptDatail(bookId, saleReceiptId, quantity, price)
    }


    // // console.log(saleReceipt);

    // const bookId = 5;
    // const saleReceiptId = 2;
    // const quantity = 10;
    // const priceD = 300000;

    // const saleReceiptDetail = addSaleReceiptDatail(bookId, saleReceiptId, quantity, priceD);

    res.redirect('/sale/' + saleReceiptId);

}



addSaleReceiptDatail = async (bookId, saleReceiptId, quantity, price) => {
    const saleReceiptDetail = await saleReceiptDetailService.addSaleReceiptDetail(bookId, saleReceiptId, quantity, price);
    console.log(saleReceiptDetail);
    return saleReceiptDetail;
}


