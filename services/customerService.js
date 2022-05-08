const { models } = require('../models');

exports.getAllCustomerInfor = async (raw = false) => {
    try{
        const res = await models.customer.findAll({
            raw: raw,
            where: {

            }
        });

        return res;
    }catch (e){
        console.log(e);
    }

}

