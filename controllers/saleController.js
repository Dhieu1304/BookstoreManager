
const saleReceiptService = require('../services/saleReceiptService');
const saleReceiptDetailService = require("../services/saleReceiptDetailService");

exports.getSalePage = (req, res) => {
    res.render('sale/sale', {title: 'Sale'});
}

exports.addSaleReceipt = async (req, res) => {
    const data = req.body;

    const phoneNumber = "0934060253";
    const price = 100;
    const createAt = new Date();

    const customerId = 1;

    // const saleReceipt = await saleReceiptService.addSaleReceipt(createAt, customerId, price);

    // console.log(saleReceipt);

    const bookId = 5;
    const saleReceiptId = 2;
    const quantity = 10;
    const priceD = 300000;

    const saleReceiptDetail = addSaleReceiptDatail(bookId, saleReceiptId, quantity, priceD);

}


addSaleReceiptDatail = async (bookId, saleReceiptId, quantity, price) => {
    const saleReceiptDetail = await saleReceiptDetailService.addSaleReceiptDetail(bookId, saleReceiptId, quantity, price);
    console.log(saleReceiptDetail);
    return saleReceiptDetail;
}


