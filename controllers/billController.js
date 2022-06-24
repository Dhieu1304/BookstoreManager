
const billService = require('../services/billService');


exports.getBillPage = async (req, res) => {

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








    
    const pagination = {
        page: page,
        limit: limit,
        totalRows: 0
    }


    ///
    const billsAndCount = await billService.getAndCountAllBills(page, limit, filter, true);

    if(!billsAndCount){
        res.render('bill/billPage', {title: 'Bill', pagination, filter});
        return;
    }

    const bills = billsAndCount.rows;
    const count = billsAndCount.count;

    pagination.totalRows = count;


    res.render('bill/billPage', {title: 'Bill', bills, pagination, filter});
}



exports.getBillAddPage = (req, res) => {
    res.render('bill/billAddPage', {title: 'Bill Add Page'});
}


exports.getBillDetailPage = async (req, res) => {


    const billId = req.params.id;

    const bill = await billService.getBillById(billId, false);


    res.render('bill/billDetailPage', {title: 'billDetailPage', bill});
}

exports.addBill = async (req, res) => {

    const data = req.body;

    // Test
    const createAt = new Date();
    const customerId  = data.id;
    const money = data.money;


    const bill = await billService.addBill(createAt, customerId, money);
    const id = bill.id;

    res.redirect('/bill/' + id);

}
