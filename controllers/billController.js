
const billService = require('../services/billService');

exports.getBillPage = (req, res) => {
    res.render('bill/bill', {title: 'Bill'});
}


exports.addBill = async (req, res) => {


    // const data = req.body;

    // const bookIds = data.bookIds;

    // const quantitys = data.quantitys;

    // const customerId = data.customerId;

    // const prices = data.prices;

    // let totalPrice = 0;

    // if(prices){
    //     if(Array.isArray(prices)){
    //         totalPrice = prices.reduce(function(acc, val) { return acc + parseInt(val); }, 0);
    //     }else{
    //         totalPrice = prices;
    //     }
    // }

    // const createAt = new Date();

    // const bill = await billService.addBill(createAt, customerId, totalPrice);
    // const billId = bill.id;

    // const billDetailSize = bookIds.length;


    // if(Array.isArray(prices)){
    //     for await (const p of prices) {
    //         const bookId = bookIds.shift();
    //         const quantity = quantitys.shift();
    //         const price = p;
    //         const billDetail = await addBillDatail(bookId, billId, quantity, price)
    //     }
    // }else {
    //     const bookId = bookIds;
    //     const quantity = quantitys;
    //     const price = prices;
    //     const billDetail = await addBillDatail(bookId, billId, quantity, price)
    // }


    // Test
    const createAt = new Date();
    const customerId  = 1;
    const money = 6;

    const bill = billService.addBill(createAt, customerId, money);

    res.redirect('/bill');

}
