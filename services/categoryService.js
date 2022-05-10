const { models } = require('../models');

exports.getAllCategoryInfor = async (raw = false) => {
    try{
        const categorys = await models.category.findAll({
            raw: raw,
            where: {

            }
        });

        return categorys;
    }catch (e){
        console.log(e);
    }

}

