const customerService = require("../services/customerService");
const excelJS = require("exceljs");
const regex = require('../utils/regex');

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


module.exports.exportCustomer = async (req, res) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Customers");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search;

    let filter = {
        page: page,
        limit: limit,
        search: search
    }

    const customersRes = await customerService.getCustomersFilter(filter);
    const customers = customersRes.rows;

    worksheet.columns = [
        {header: "No.", key: "s_no", width: 7},
        {header: "Id.", key: "id", width: 7},
        {header: "Name", key: "name", width: 20},
        {header: "Email", key: "email", width: 30},
        {header: "Phone", key: "phone", width: 15},
        {header: "Address", key: "address", width: 25},
        {header: "Dept", key: "dept", width: 7},
    ];

    let counter = 1;

    customers.forEach((customer) => {
        customer.s_no = counter;
        worksheet.addRow(customer);
        counter++;
    });

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = {bold: true};
    });

    try {
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", `attachment; filename=export-customers.xlsx`);

        return workbook.xlsx.write(res).then(() => {
            res.status(200);
        });
    } catch (err) {
        res.send({
            status: "error",
            message: "Something went wrong",
        });
    }
};

module.exports.apiCustomeDetail = async (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errCode: 3,
            errMessage: "Error Customer!",
        })
    }

    const customer = await customerService.getCustomerById(id);

    if (customer) {
        return res.status(200).json({
            errCode: 0,
            errMessage: "Successful!",
            data: customer
        })
    }

    return res.status(200).json({
        errCode: 1,
        errMessage: "Error!",
    })
}

module.exports.apiEditCustomer = async (req, res) => {
    const {id, name, phone, email, address, dept} = req.body;
    const customer = {id, name, phone, email, address, dept}

    if (!regex.numberRegex(customer.phone) || !regex.numberRegex(customer.dept) || !regex.emailRegex(customer.email)) {
        return res.status(200).json({
            errCode: 2,
            errMessage: "Error Input"
        })
    }

    const existCustomer = await customerService.getCustomerInforByPhoneNumber(customer.phone, true);
    if (existCustomer && existCustomer.id.toString() !== customer.id) {
        return res.status(200).json({
            errCode: 3,
            errMessage: "This phone number has been used"
        })
    }

    const isEdit = await customerService.editCustomer(customer);

    if (isEdit) {
        return res.status(200).json({
            errCode: 0,
            errMessage: "Edit Successful!"
        })
    }

    return res.status(200).json({
        errCode: 1,
        errMessage: "Error!",
    })
}
