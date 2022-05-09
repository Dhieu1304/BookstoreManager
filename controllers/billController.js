
// const billService = require('../services/billService');
// const billService = require("../services/billService");

exports.getBillPage = (req, res) => {
    res.render('bill/bill', {title: 'Bill'});
}
