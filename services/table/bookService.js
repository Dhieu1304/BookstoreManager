const {models}=require('../../models');

exports.bookList=async (page,limit,raw=false)=>{
    let options = {
        // include:
        //     [
        //         {
        //             model: models.category,
        //             as: "category",
        //             where: {
        //
        //             }
        //         },
        //     ],
        order: [
            ['id', 'ASC'],
        ],
        where: {

        },
        raw: raw
    };

    if(limit && page){
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    const books=await models.book.findAndCountAll(options);
    console.log("BOOK", books);
    return books;
};