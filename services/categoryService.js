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


exports.getCategoryIdByBookId = (bookId)=>models.book_category.findOne({
    where: ({book_id: bookId}),
    raw: true
})


exports.getCategoryById = (categoryId) => models.category.findOne({
    where: ({id: categoryId}),
    raw: true
});


exports.addBookCategory = async (book_id, category_id) => {
    try{


        const category = await models.book_category.create(
            {
                book_id: book_id,
                category_id: category_id
            }
        );

        return category;
    }catch (e) {
        console.log(e);
    }
}


exports.editBookCategory = async (book_id, category_id) => {

    return new Promise(async (resolve, reject)=>{
        try {
            const category=await models.book_category.findOne({where: {book_id: book_id}});
            if(category) {
                await models.book_category.destroy({where: {book_id: book_id, category_id: category.category_id}});
                const newCategory=await this.addBookCategory(book_id, category_id);
                resolve(newCategory);
            }
            else
                resolve(false);
        } catch (e) {
            reject(e);
        }
    })
}


