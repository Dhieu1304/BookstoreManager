const { models } = require('../models');

const bookStockService = require('../services/bookStockService')

exports.addBook = async (isbn, title, num_page, publication_date, publisher_id) => {
    try{
        num_page = parseInt(num_page) || 0

        const book = await models.book.create(
            {
                isbn: isbn,
                title: title,
                num_page: num_page,
                publication_date: publication_date,
                publisher_id: publisher_id
            }
        );

        const bookStock =  await bookStockService.addBookStock(book.id, 0, 0, 'active');

        return book;
    }catch (e) {
        console.log(e);
    }
}