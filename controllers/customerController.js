const customerService = require("../services/customerService");

module.exports.customerPage = (req, res) => {
    res.render('customer', {title: 'Customer'});
}


module.exports.apiListCustomer = async (req, res) => {

    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 5;
    const search = req.body.search;

    let filter = {
        page: page,
        limit: limit,
        search: search
    }

    const customers = await customerService.getCustomersFilter(filter);

    let pagination = {
        page: filter.page,
        limit: filter.limit,
        totalRows: 0,
    }

    if (customers) {

        pagination.totalRows = customers.count;

        return res.status(200).json({
            errCode: 0,
            errMessage: "Successful!",
            data: {
                customers: customers.rows,
                pagination: pagination
            },

        })
    }

    return res.status(200).json({
        errCode: 1,
        errMessage: "Error!",
        data: {
            customers: {},
            pagination: pagination
        }
    })
}