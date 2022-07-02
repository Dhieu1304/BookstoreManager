const bookService = require('../../services/table/bookService');
const bookImgService = require('../../services/bookImgService');
const publisherService=require('../../services/publisherService');
const bookStockService=require('../../services/bookStockService');
const categoryService=require('../../services/categoryService');
const authorService=require('../../services/authorService');
const excelJS = require("exceljs");


exports.getAllBooks = async (req, res) => {

    const data = req.query;
    // console.log(data);
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit)||10;


    const allBooks = await bookService.bookList(page, limit, true);
    const books = allBooks.rows;
    const count = allBooks.count;

    for (let book of books) {
        const id = book.id;
        const image = await bookImgService.getAvatarImgByBookId(id);
        book.image = image;

        const publisher = await publisherService.getBookPublisherById(book.publisher_id);
        book.publisher = publisher.name;

        const bookStock = await bookStockService.getBookStockById(id, true);
        book.price = bookStock.price;
        book.status = bookStock.status;
        if(bookStock.status==='active')
            book.status=true;
        else
            book.status=false;



        //const bookAuthor = await authorService.getAuthorByBookId(id, true);

        // const author=await authorService.getAuthorById(bookAuthor.author_id, true);
        // book.author=author.name;


        const bookCategory = await categoryService.getCategoryIdByBookId(id);
        const categoryInfo = await categoryService.getCategoryById(bookCategory.category_id);
        book.category = categoryInfo.name;

    }

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    };

    // res.render('table/book', {title: 'Book List', layout: 'layout.hbs', books, pagination})
    res.json({books, pagination});
}

