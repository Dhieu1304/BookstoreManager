
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


module.exports.addNewCustomer = async (req, res) => {

    const data = req.body;
    const newCustormerName = data.newCustormerName;
    const newCustormerPhone = data.newCustormerPhone;
    const newCustormerEmail = data.newCustormerEmail;
    const newCustormerAddress = data.newCustormerAddress;


    const customer = await customerService.addNewCustomer(newCustormerName ,newCustormerPhone ,newCustormerEmail ,newCustormerAddress);

    res.status(200).json({customer});
}



