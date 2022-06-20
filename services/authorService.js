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



exports.getAuthorsByName = async (name, raw = false) => {
    try{
        const authors = await models.author.findAll({
            raw: raw,
            where: {
                name: name
            }
        });

        return authors;
    }catch (e){
        console.log(e);
    }

}


exports.getAuthorByBookId=async (book_id, raw=false)=>{
    try{
        const author = await models.book_author.findOne({
            raw: raw,
            where: {
                book_id: book_id
            }
        });

        return author;
    }catch (e){
        console.log(e);
    }
}


exports.getAuthorById=async (id, raw=false)=>{
    try{
        const author = await models.author.findOne({
            raw: raw,
            where: {
                id: id
            }
        });

        return author;
    }catch (e){
        console.log(e);
    }
}


