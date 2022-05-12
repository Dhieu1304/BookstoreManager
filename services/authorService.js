const { models } = require('../models');

exports.getAllAuthorInfor = async (raw = false) => {
    try{
        const authors = await models.author.findAll({
            raw: raw,
            where: {

            }
        });

        return authors;
    }catch (e){
        console.log(e);
    }

}

exports.addAuthor = async (name) => {
    try{
    

        const author = await models.author.create(
            {
               name: name
            }
        );

        return author;
    }catch (e) {
        console.log(e);
    }
}


