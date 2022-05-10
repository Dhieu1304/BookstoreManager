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

exports.addNewCustomer = async(name ,phone , email ,address) => {
    try{
        

        const customer = await models.customer.create(
            {
                name: name,
                phone: phone,
                email: email,
                address: address,
                dept: 0
            }
        );

        return customer;
    }catch (e) {
        console.log(e);
    }
}


