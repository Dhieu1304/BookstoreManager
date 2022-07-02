const bookService = require('../../services/table/bookService');
const bookImgService = require('../../services/bookImgService');
const publisherService=require('../../services/publisherService');
const bookStockService=require('../../services/bookStockService');
const categoryService=require('../../services/categoryService');
const authorService=require('../../services/authorService');
const fs=require('fs');

exports.bookList = async (req, res) => {
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

    res.render('table/book', {title: 'Book List', layout: 'layout.hbs', books, pagination})
};


exports.addBookPage = async (req, res) => {
    const publisher = await publisherService.getAllPublisherInfor(true);
    const author=await authorService.getAllAuthorInfor(true);
    const category = await categoryService.getAllCategoryInfor(true);
    res.render('table/addBook', {title: 'addBook', layout: 'layout.hbs', publisher, author, category});
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

    //author
    // const allAuthor=await authorService.getAllAuthorInfor(true);
    // let newAuthor=true;
    // for(let eachAuthor of allAuthor){
    //     if(author===eachAuthor.name){
    //         //console.log("SS", author,"=", eachAuthor.name);
    //         newAuthor=false;
    //     }
    // }
    // //console.log("NEW AUTHOR:", newAuthor);
    // if(newAuthor===true)
    //     await authorService.addAuthor(author);
    //
    // const findAuthor=await authorService.getAuthorsByName(author, true);
    // await authorService.addBookAuthor(book.id, findAuthor.id);

    const allCategory=await categoryService.getAllCategoryInfor(true);
    let newCategory=true;
    for(let eachCategory of allCategory){
        if(category===eachCategory.name){
            newCategory=false;
        }
    }
    if(newCategory===true)
        await categoryService.addCategory(category);
    const findCategory=await categoryService.getCategoryByName(category, true);
    await categoryService.addBookCategory(book.id, findCategory.id);

    const pictureFiles=req.files;
    console.log("PICTURE FILES ADD :", pictureFiles); //undefined
    if (pictureFiles) {
        for (let pictureFile of pictureFiles) {
            let path = pictureFile.path.replace(/\\/g, "/");
            let link = path.replace('public', "");
            const addNewPicture = await bookImgService.addImg(book.id, link);
        }
    }

    const redirectPath = "/table/book/" + book.id + "/action";
    res.redirect(redirectPath);
}


exports.editBookPage = async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await bookService.getBookById(id);

    const image = await bookImgService.getImgInfoByBookId(id);
    book.image = image;

    const publisher = await publisherService.getBookPublisherById(book.publisher_id);
    book.publisher = publisher;

    //const bookAuthor = await authorService.getAuthorByBookId(id, true);
    // const author=await authorService.getAuthorById(bookAuthor.author_id, true);
    // book.author=author.name;

    const bookStock = await bookStockService.getBookStockById(id, true);
    book.price = bookStock.price;
    book.status = bookStock.status;
    if(bookStock.status==='active')
        book.status=true;
    else
        book.status=false;

    //console.log("STATUS:", book.status);

    const bookCategory = await categoryService.getCategoryIdByBookId(id);
    const categoryInfo = await categoryService.getCategoryById(bookCategory.category_id);
    book.category = categoryInfo.name;

    const allPublisher = await publisherService.getAllPublisherInfor(true);
    const allAuthor=await authorService.getAllAuthorInfor(true);
    const allCategory = await categoryService.getAllCategoryInfor(true);

    res.render('table/editBook', {title: 'Book', layout: 'layout.hbs', book, allPublisher, allAuthor, allCategory});
}


exports.editBook=async (req, res)=>{
    const id=parseInt(req.params.id);
    console.log("ID: ",id);


    const {isbn, title, num_page, publication_date, price, publisher, author, category}=req.body;
    const deletePictures=req.body.deletePictures;
    const deletePictureLinkInput=req.body.deletePictureLinks;
    const pictureFiles=req.files;

    console.log("DELETE P:", deletePictures);
    console.log("DELETE P LINK:", deletePictureLinkInput);
    console.log("P FILES:", pictureFiles);

    const allPublisher=await publisherService.getAllPublisherInfor(true);
    let newPublisher=true;
    for(let eachPublisher of allPublisher){
        if(publisher===eachPublisher.name){
            newPublisher=false;
        }
    }
    if(newPublisher===true)
        await publisherService.addPublisher(publisher);

    let book = await bookService.editBook(id, isbn, title, num_page, publication_date, publisher);

    //edit bookStock, bookAuthor, bookCategory
    await bookStockService.editBookStock(id, price, 'active');

    //author

    // const allAuthor=await authorService.getAllAuthorInfor(true);
    // let newAuthor=true;
    // for(let eachAuthor of allAuthor){
    //     if(author===eachAuthor.name){
    //         console.log("SS", author,"=", eachAuthor.name);
    //         newAuthor=false;
    //     }
    // }
    // console.log("NEW AUTHOR:", newAuthor);
    // if(newAuthor===true)
    //     await authorService.addAuthor(author);
    // const findAuthor=authorService.getAuthorsByName(author, true);
    // console.log("AUTHOR:", findAuthor);
    // const a=await authorService.editBookAuthor(id, findAuthor.id);
    // console.log("EDIT AUTHOR:", a);

    const allCategory=await categoryService.getAllCategoryInfor(true);
    let newCategory=true;
    for(let eachCategory of allCategory){
        if(category===eachCategory.name){
            newCategory=false;
        }
    }
    if(newCategory===true)
        await categoryService.addCategory(category);
    const findCategory=await categoryService.getCategoryByName(category, true);
    await categoryService.editBookCategory(id, findCategory.id);

    if (pictureFiles) {
        for (let pictureFile of pictureFiles) {
            let path = pictureFile.path.replace(/\\/g, "/");
            let link = path.replace('public', "");
            const addNewPicture = await bookImgService.addImg(id, link);
        }
    }

    if (deletePictures) {

        if (deletePictureLinkInput) {
            await removePicturePaths(deletePictureLinkInput);
        }

        await bookImgService.deleteImgByIds(deletePictures);
    }

    const redirectPath = "/table/book/" + id + "/action";
    res.redirect(redirectPath);
}

removePicturePaths = async function (deletePictureLinkInput) {
    for (let link of deletePictureLinkInput) {
        console.log("deletePictureLinkInput: ", link);
        try {
            fs.unlinkSync("./public" + link);
        } catch (e) {
            return false;
        }

    }
}

exports.removeBook=async (req, res)=>{
    const id = parseInt(req.params.id);
    await bookService.removeBook(id);
    res.redirect('/table/book/');
}


