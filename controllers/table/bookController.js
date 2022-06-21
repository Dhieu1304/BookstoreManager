const bookService = require('../../services/table/bookService');
const bookImgService = require('../../services/bookImgService');
const publisherService=require('../../services/publisherService');
const bookStockService=require('../../services/bookStockService');
const categoryService=require('../../services/categoryService');
const authorService=require('../../services/authorService');

exports.bookList = async (req, res) => {
    const data = req.query;
    // console.log(data);
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit);


    const allBooks = await bookService.bookList(page, limit, true);
    const books = allBooks.rows;
    const count = allBooks.count;

    for (let book of books) {
        const id = book.id;
        const image = await bookImgService.getAvatarImgByBookId(id);
        book.image = image;

        const publisher = await publisherService.getBookPublisherById(book.publisher_id);
        book.publisher = publisher.name;

        // const bookStock = await bookStockService.getBookStockById(id, true);
        // book.price = bookStock.price;
        // //book.status = bookStock.status;
        // if(bookStock.status==='active')
        //     book.status=true;
        // else
        //     book.status=false;

        //////////////Ra undefined

        const bookAuthor = await authorService.getAuthorByBookId(id, true);
        console.log("AT", bookAuthor);

        //Chạy đúng
        const author=await authorService.getAuthorById(3, true);
        //const author=await authorService.getAuthorById(bookAuthor.author_id, true);
        book.author=author.name;
        console.log("AT2",book.author);

        // const bookCategory = await categoryService.getCategoryIdByBookId(id);
        // //console.log("CT1", bookCategory.book_id);
        // const categoryInfo = await categoryService.getCategoryById(bookCategory.category_id);
        // book.category = categoryInfo.name;

        //console.log("CT2", book.category);
    }

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    };

    res.render('table/book', {title: 'Book List', layout: 'layout.hbs', books, pagination})
};


exports.addBookPage = async (req, res) => {
    const publisher = await publisherService.getAllPublisherInfor(true);
    const category = await categoryService.getAllCategoryInfor(true);
    res.render('table/addBook', {title: 'addBook', layout: 'layout.hbs', publisher, category});
}

exports.addBook=async (req, res)=>{
    const {isbn, title, num_page, publication_date, price, publisher, author, category}=req.body;

    const allPublisher=await publisherService.getAllPublisherInfor(true);
    let newPublisher=true;
    for(let eachPublisher of allPublisher){
        if(publisher===eachPublisher.name){
            newPublisher=false;
        }
    }
    if(newPublisher===true)
        await publisherService.addPublisher(publisher);
    const book=await bookService.addBook(isbn, title, num_page, publication_date, publisher);
    await bookStockService.addBookStock(book.id, 0, price, 'active');

    //thiếu author

    const allCategory=await categoryService.getAllCategoryInfor(true);
    let newCategory=true;
    for(let eachCategory of allCategory){
        if(category===eachCategory.name){
            newCategory=false;
        }
    }
    if(newCategory===true)
        await categoryService.addCategory(category);
    const findCategory=categoryService.getCategoryByName(category, true);
    await categoryService.addBookCategory(book.id, findCategory.id);

    const imageFiles=req.files;
    if(imageFiles){
        for(let image of imageFiles){
            let path = image.path.replace(/\\/g, "/");
            let src = path.replace('public', "");
            const newImage = await bookImgService.addImg(book.id, src);
        }
    }
    res.redirect('table/book');
}


exports.editBookPage = async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await bookService.getBookById(id);

    const image = await bookImgService.getImgInfoByBookId(id);
    book.image = image;
    //console.log(book.image);

    const publisher = await publisherService.getBookPublisherById(book.publisher_id);
    book.publisher = publisher;

    // const bookStock = await bookStockService.getBookStockById(id, true);
    // book.price = bookStock.price;
    // //book.status = bookStock.status;
    // const bookCategory = await categoryService.getCategoryIdByBookId(id);
    // const categoryInfo = await categoryService.getCategoryById(bookCategory.category_id);
    // book.category = categoryInfo.name;

    const allPublisher = await publisherService.getAllPublisherInfor(true);
    const allCategory = await categoryService.getAllCategoryInfor(true);

    res.render('table/editBook', {title: 'Book', layout: 'layout.hbs', book, allPublisher, allCategory});
}


exports.editBook=async (req, res)=>{
    const id=parseInt(req.params.id);
    console.log("ID: ",id);


    const {isbn, title, num_page, publication_date, price, publisher, author, category}=req.body;
    //const deletePictures=req.body.deleteImgs;

    const allPublisher=await publisherService.getAllPublisherInfor(true);
    //console.log("PUBLISHER: ", allPublisher);
    //console.log("Publisher: ", publisher);
    let newPublisher=true;
    for(let eachPublisher of allPublisher){
        //console.log("PUBLISHER NAME: ", eachPublisher.name);
        if(publisher===eachPublisher.name){
            //console.log("SS1: ", publisher,  " = ", eachPublisher.name);
            newPublisher=false;
        }
    }
    //console.log("NEW PUBLISHER: ", newPublisher);
    if(newPublisher===true)
        await publisherService.addPublisher(publisher);

    const book = await bookService.editBook(id, isbn, title, num_page, publication_date, publisher);
    console.log("NEW PAGE: ", book.num_page);

    //edit bookStock, bookAuthor, bookCategory
    await bookStockService.editBookStock(id, price, 'active');

    //thiếu author

    const allCategory=await categoryService.getAllCategoryInfor(true);
    //console.log("CATEGORY: ", allCategory);
    let newCategory=true;
    for(let eachCategory of allCategory){
        //console.log("CATEGORY NAME: ", eachCategory.name);
        if(category===eachCategory.name){
            //console.log("SS2: ", category,  " = ", eachCategory.name);
            newCategory=false;
        }
    }
    //console.log("NEW CATEGORY: ", newCategory);
    if(newCategory===true)
        await categoryService.addCategory(category);
    const findCategory=await categoryService.getCategoryByName(category, true);
    await categoryService.editBookCategory(id, findCategory.id);

    //res.redirect('/table/book');
    res.render('table/editBook', {title: 'Book', layout: 'layout.hbs', book});
}

exports.removeBook=async (req, res)=>{
    const id = parseInt(req.params.id);
    await bookService.removeBook(id);
    res.redirect('table/book');
}


