
const billService = require('../services/billService');

exports.getBillPage = (req, res) => {
    res.render('bill/bill', {title: 'Bill'});
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
