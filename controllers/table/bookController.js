const bookService = require('../../services/table/bookService');
const bookImgService = require('../../services/bookImgService');

exports.bookList = async (req, res) => {
    const data = req.query;
    // console.log(data);
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;



    const allBooks = await bookService.bookList(page, limit, true);
    const books = allBooks.rows;
    const count = allBooks.count;

    for (let book of books) {
        const id = book.id;
        const image = await bookImgService.getAvatarImgByBookId(id);
        book.image = image;
    }

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    };

    res.render('table/book', {title: 'Book List', layout: 'layout.hbs', books, pagination})
};


