const bookService=require('../../services/table/bookService');

exports.bookList=async (req,res)=>{
    const data=req.query;
    // console.log(data);
    const page=parseInt(data.page)||1;
    const limit=parseInt(data.limit)||10;


    //const brandNames = await brandService.getAllBrandName(true);

//Lấy products
    const allBooks = await bookService.bookList(page,limit,true);
    //console.log("ALL BOOK controller", books);
//products
    const books = allBooks.rows;
    //console.log("BOOK controller", books);
//Số lượng các products
    const count = allBooks.count;

// for (let product of products) {
//     const id = product.id;
//     const picture = await pictureService.getAvatarPictureByProductId(id);
//     product.picture = picture;
// }

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    };

    res.render('table/book', { title: 'Book List', layout: 'layout.hbs', books, pagination })
};


