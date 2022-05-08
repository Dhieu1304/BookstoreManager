
const customerService = require('../../services/customerService');

module.exports.getAllCustomerInfor = async (req, res) => {


    const customers = await customerService.getAllCustomerInfor(true)
    res.status(200).json({customers});
}

