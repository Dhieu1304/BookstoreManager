
const customerService = require('../../services/customerService');

module.exports.getAllCustomerInfor = async (req, res) => {


    const customers = await customerService.getAllCustomerInfor(true)
    res.status(200).json({customers});
}


module.exports.getCustomerInforByPhoneNumber = async (req, res) => {

    const phoneNumber = req.params.number;
    const customer = await customerService.getCustomerInforByPhoneNumber(phoneNumber, true)
    res.status(200).json({customer});
}


