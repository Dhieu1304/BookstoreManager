
const saleReceiptService = require('../services/saleReceiptService');
const saleReceiptDetailService = require("../services/saleReceiptDetailService");
const bookStockService = require("../services/bookStockService");
const customerService = require("../services/customerService");


exports.getSalePage = async (req, res) => {



    res.render('sale/salePage', {title: 'Sale', bookStocks, customers});
}

exports.getSaleAddPage = async (req, res) => {

    const bookStocks = await bookStockService.getAllBookStock(false);

    const customers = await customerService.getAllCustomerInfor(true);

    res.render('sale/saleAddPage', {title: 'Add Sale', bookStocks, customers});
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

    res.redirect('/sale');

}



addSaleReceiptDatail = async (bookId, saleReceiptId, quantity, price) => {
    const saleReceiptDetail = await saleReceiptDetailService.addSaleReceiptDetail(bookId, saleReceiptId, quantity, price);
    console.log(saleReceiptDetail);
    return saleReceiptDetail;
}


