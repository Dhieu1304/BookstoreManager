const {models} = require('../../models');
const publisherService = require('../publisherService');
const bookStockService=require('../bookStockService');

const { Op } = require("sequelize")
const  sequelize = require("sequelize")

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
    try {
        const book = await this.getBookById(id);
        //console.log("OLD BOOK: ", book);

        const publisher = await publisherService.getPubliserByName(publisher_name, true);
        const publisher_id = publisher.id;
        if(book) {
            book.isbn = isbn;
            book.title = title;
            book.num_page = num_page;
            book.publication_date = publication_date;
            book.publisher_id = publisher_id;
        }
        // book.update({
        //     isbn: isbn,
        //     title: title,
        //     num_page: num_page,
        //     publication_date: publication_date,
        //     publisher_id: publisher_id
        // })


        console.log("EDIT BOOK: ", book);


        //await book.save();
        return book;
    } catch (e) {
        console.log(e);
    }
}


// exports.editBook = async (id, isbn, title, num_page, publication_date, publisher_name) => {
//     return new Promise(async (resolve, reject)=>{
//         try {
//             const book = await this.getBookById(id);
//             //console.log("OLD BOOK: ", book);
//
//             const publisher = await publisherService.getPubliserByName(publisher_name, true);
//             const publisher_id = publisher.id;
//             if(book) {
//                 book.isbn = isbn;
//                 book.title = title;
//                 book.num_page = num_page;
//                 book.publication_date = publication_date;
//                 book.publisher_id = publisher_id;
//
//
//
//                 await book.save();
//                 console.log("EDIT BOOK: ", book);
//
//                 resolve(book);
//                 return book;
//             }
//         } catch (e) {
//             //console.log(e);
//             reject(false);
//         }
//     })
//
// }


exports.removeBook=async (id)=>{
    try{
        const bookStock=await bookStockService.getBookStockById(id, true);
        if(bookStock){
            bookStock.status='lock';
        }
        //console.log("STATUS book", id, ": ", bookStock.status);
        return bookStock;
    }
    catch (e) {
        console.log(e);
    }
}




