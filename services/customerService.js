const { models } = require('../models');

exports.getAllCustomerInfor = async (raw = false) => {
    try{
        const customers = await models.customer.findAll({
            raw: raw,
            where: {

            }
        });

        return customers;
    }catch (e){
        console.log(e);
    }

}


exports.getCustomerInforByPhoneNumber = async (phone, raw = false) => {
    try{
        const customers = await models.customer.findAll({
            raw: raw,
            where:  ({ phone: phone }),
        });

        if(customers.length == 0){
            return false;
        }

        return customers[0];
    }catch (e){
        console.log(e);
    }

}
