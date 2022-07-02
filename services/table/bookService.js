const {models} = require('../../models');
const publisherService = require('../publisherService');
const bookStockService=require('../bookStockService');

//const { Op } = require("sequelize")
//const  sequelize = require("sequelize")

exports.bookList = async (page, limit, raw = false) => {
    let options = {
        order: [
            ['id', 'ASC'],
        ],
        where: {},
        raw: raw
    };

    if (limit && page) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    const books = await models.book.findAndCountAll(options);
    //console.log("BOOK", books);
    return books;
};


exports.addBook = async (isbn, title, num_page, publication_date, publisher_name) => {
    try {
        const publisher = await publisherService.getPubliserByName(publisher_name, true);
        console.log('publisher: ', publisher);
        const publisher_id = publisher.id;
        console.log('publisherId: ', publisher_id);

        const book = await models.book.create({
            isbn: isbn,
            title: title,
            num_page: num_page,
            publication_date: publication_date,
            publisher_id: publisher_id
        });
        //await book.save();
        return book;

    } catch (e) {
        console.log(e);
    }
}


exports.getBookById = (bookId) => models.book.findOne({
    where: ({id: bookId}),
    raw: true
});



exports.editBook = async (id, isbn, title, num_page, publication_date, publisher_name) => {
    return new Promise(async (resolve, reject)=>{
        try {
            //const book = await this.getBookById(id);
            // //console.log("OLD BOOK: ", book);
            const book=await models.book.findOne({where: {id: id}});

            const publisher = await publisherService.getPubliserByName(publisher_name, true);
            const publisher_id = publisher.id;
            if(book) {
                book.isbn = isbn;
                book.title = title;
                book.num_page = num_page;
                book.publication_date = publication_date;
                book.publisher_id = publisher_id;


                await book.save();

                resolve(book);
                //return book;
            }
            else
                resolve(false);
        } catch (e) {
            reject(e);
        }
    })

}




exports.removeBook=async (id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            const bookStock=await models.book_stock.findOne({where: {book_id: id}});
            if(bookStock) {
                bookStock.status = 'locked';


                await bookStock.save();

                resolve(bookStock);
            }
            else
                resolve(false);
        } catch (e) {
            reject(e);
        }
    })
}




