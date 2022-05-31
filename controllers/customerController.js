const customerService = require("../services/customerService");
const excelJS = require("exceljs");


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


module.exports.exportUser = async (req, res) => {
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
