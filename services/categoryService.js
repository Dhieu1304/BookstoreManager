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


exports.addCategory = async (name) => {
    try{
    

        const category = await models.category.create(
            {
               name: name
            }
        );

        return category;
    }catch (e) {
        console.log(e);
    }
}


exports.getCategoryByName = async (name, raw = false) => {
    try{
        const category = await models.category.findOne({
            raw: raw,
            where: {
                name: name
            }
        });

        return category;
    }catch (e){
        console.log(e);
    }

}


