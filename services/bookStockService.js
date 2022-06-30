const {models} = require('../models');

const bookImgService = require('../services/bookImgService')
const {options} = require("pg/lib/defaults");


exports.addBookStock = async (book_id, quantity, price, status = 'active') => {
    try {

        const bookStock = await models.book_stock.create(
            {
                book_id: book_id,
                quantity: quantity,
                price: price,
                status: status,
            }
        );

        return bookStock;
    } catch (e) {
        console.log(e);
    }
}


exports.getBookStockById = async (book_id, raw = false) => {
    book_id = parseInt(book_id);

    try {
        const bookStocks = await models.book_stock.findAll({
            raw: raw,
            include:
                [
                    {
                        model: models.book,
                        as: "book",

                        include:
                            [
                                {
                                    model: models.category,
                                    as: "category_id_categories",

                                },
                                {
                                    model: models.publisher,
                                    as: "publisher",
                                    attributes: [
                                        'name'
                                    ]
                                },
                                {
                                    model: models.author,
                                    as: "author_id_authors",

                                },
                            ],
                    },
                ],
            where: ({book_id: book_id})
        });

        // if(bookStocks.length == 0){
        //     return false;
        // }

        // const bookStock = bookStocks.find(bookStock => bookStock.book_id = book_id);

        return bookStocks[0];

    } catch (e) {
        console.log(e);
    }
}


exports.getBookStockByIsbn = async (isbn, raw = false, status = 'active') => {
    try {
        const bookStock = await models.book_stock.findOne({
            raw: raw,
            include:
                [
                    {
                        model: models.book,
                        as: "book",
                        where: ({isbn: isbn}),
                        include:
                            [
                                {
                                    model: models.category,
                                    as: "category_id_categories",

                                },
                                {
                                    model: models.publisher,
                                    as: "publisher",
                                    attributes: [
                                        'name'
                                    ]
                                },
                                {
                                    model: models.author,
                                    as: "author_id_authors",

                                },
                            ],
                    },
                ],
        });




        if (bookStock) {
            const bookId = bookStock.book_id;
            const avatar = await bookImgService.getAvatarImgByBookId(bookId);



            if (raw) {




                if(avatar && avatar.src){
                    bookStock.avatar = avatar.src
                }else{
                    bookStock.avatar = "";
                }


            } else {
                // bookStock.da

                if(avatar && avatar.src){
                    bookStock.dataValues.avatar = avatar.src
                }else {
                    bookStock.dataValues.avatar = "";
                }

            }


        }

        return bookStock;


    } catch (e) {
        console.log(e);
    }
}

exports.getAllBookStocksByBookIds = async (bookIds, raw = false) => {
    try {
        const bookStocks = await models.book_stock.findAll({
            raw: raw,
            where: ({book_id: bookIds}),
            include:
                [
                    {
                        model: models.book,
                        as: "book",
                        include:
                            [
                                {
                                    model: models.category,
                                    as: "category_id_categories",

                                },
                                {
                                    model: models.publisher,
                                    as: "publisher",
                                    attributes: [
                                        'name'
                                    ]
                                },
                                {
                                    model: models.author,
                                    as: "author_id_authors",

                                },
                            ],
                    },
                ],
        });


        if (bookStocks && bookStocks.length > 0) {

            const bookStocksResult = [];
            for (let bookStock of bookStocks) {

                const bookId = bookStock.book_id;
                const avatar = await bookImgService.getAvatarImgByBookId(bookId);

                if (raw) {
                    bookStock.avatar = avatar.src;
                } else {
                    // bookStock.da
                    bookStock.dataValues.avatar = avatar.src;
                }

                bookStocksResult.push(bookStock);


            }
            return bookStocksResult;
        }
        return [];


    } catch (e) {
        console.log(e);
    }
}


exports.getAllBookStock = async (raw = false) => {
    return await models.book_stock.findAll({
        raw: raw,
        include:
            [
                {
                    model: models.book,
                    as: "book",
                    where: {},
                    include:
                        [
                            {
                                model: models.category,
                                as: "category_id_categories",
                                where: {}
                            },
                            {
                                model: models.publisher,
                                as: "publisher",
                                attributes: [
                                    'name'
                                ]
                            },
                            {
                                model: models.author,
                                as: "author_id_authors",
                                where: {}
                            },
                        ],
                },
            ],
        where: {}
    });
}


exports.editBookStock = async (book_id, price, status) => {
    return new Promise(async (resolve, reject)=>{
        try {
            const bookStock=await models.book_stock.findOne({where: {book_id: book_id}});
            if(bookStock) {
                bookStock.price = price;
                bookStock.status = status;


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

