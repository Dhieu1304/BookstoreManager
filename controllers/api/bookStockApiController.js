
const bookStockService = require('../../services/bookStockService');
const bookService = require('../../services/bookService');
const publisherService = require('../../services/publisherService');
const authorService = require('../../services/authorService');
const categoryService = require('../../services/categoryService');

module.exports.getAllBookStock = async (req, res) => {

    
    const bookStocks = await bookStockService.getAllBookStock(false);
    // const bookStocks = datas.map(function(item){ let data = item.toJSON(); return data.book; });

    res.status(200).json({bookStocks});
}


module.exports.addBook = async (req, res) => {


    const data = req.body;

    const newBookIsbn = data.newBookIsbn;
    const newBookPageNumber = data.newBookPageNumber;
    const newBookPublisherDate = data.newBookPublisherDate;
    const newBookTitle = data.newBookTitle;
    const publisherId = data.publisherId;
    const authorIds = data['authorIds[]']
    const categoryIds = data['categoryIds[]']


    //Test
    // const isbn = 'xxx';
    // const title = 'yyy';
    // const num_page = 100;
    // const publication_date = new Date();
    // const publisher_id = 5;

    const book = await bookService.addBook(newBookIsbn, newBookTitle, newBookPageNumber, newBookPublisherDate, publisherId);

    const bookId = book.id;

    if(authorIds){
        for await (let authorId of authorIds){
            await bookService.addBookAuthor(bookId, authorId);
        }
    }


    if(categoryIds){
        for await (let categoryId of categoryIds){
            await bookService.addBookAuthor(bookId, categoryId);
        }
    }



    const bookStock = await bookStockService.getBookStockById(bookId,false);

    res.status(200).json({bookStock});
}


module.exports.addPublisher = async (req, res) => {

    //Test
    const data = req.body;
    const publisherName = data.publisherName


    const publisher = await publisherService.addPublisher(publisherName);

    res.status(200).json({publisher});
}


module.exports.addAuthor = async (req, res) => {


    const data = req.body;
    const authorName = data.authorName


    const author = await authorService.addAuthor(authorName);

    res.status(200).json({author});
}

module.exports.addCategory = async (req, res) => {


    const data = req.body;
    const categoryName = data.categoryName


    const category = await categoryService.addCategory(categoryName);

    res.status(200).json({category});
}


module.exports.getBookStockByBookId = async (req, res) => {


    const bookId = req.params.id;


    const bookStock = await bookStockService.getBookStockById(bookId,false);

    res.status(200).json({bookStock});
}
