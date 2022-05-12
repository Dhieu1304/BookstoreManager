const { models } = require('../models');

const bookStockService = require('../services/bookStockService')

exports.addBook = async (isbn, title, num_page, publication_date, publisher_id) => {
    try{
        num_page = parseInt(num_page) || 0
        publisher_id = publisher_id || 1
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


exports.addBookCategory = async (book_id, category_id) => {
    try{
        const bookCategory = await models.book_category.create(
            {
                book_id: book_id,
                category_id: category_id,
            }
        );


        return bookCategory;
    }catch (e) {
        console.log(e);
    }
}


exports.addBookAuthor = async (book_id, author_id) => {
    try{
        const bookAuthor = await models.book_author.create(
            {
                book_id: book_id,
                author_id: author_id,
            }
        );


        return bookAuthor;
    }catch (e) {
        console.log(e);
    }
}

