const { models } = require('../models');

exports.getAllPublisherInfor = async (raw = false) => {
    try{
        const publishers = await models.publisher.findAll({
            raw: raw,
            where: {

            }
        });

        return publishers;
    }catch (e){
        console.log(e);
    }

}

