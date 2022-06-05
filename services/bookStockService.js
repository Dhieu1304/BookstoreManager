const { models } = require('../models');

const bookImgService = require('../services/bookImgService')



exports.addBookStock = async (book_id, quantity, price, status = 'active') => {
    try{

        const bookStock = await models.book_stock.create(
            {
                book_id: book_id,
                quantity: quantity,
                price: price,
                status: status,
            }
        );

        return bookStock;
    }catch (e) {
        console.log(e);
    }
}



exports.getBookStockById = async (book_id, raw = false) => {
    book_id = parseInt(book_id);

    try{
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
            where: ({ book_id: book_id })
        });

        // if(bookStocks.length == 0){
        //     return false;
        // }

        // const bookStock = bookStocks.find(bookStock => bookStock.book_id = book_id);

        return bookStocks[0];

    }
    catch (e) {
        console.log(e);
    }
}


exports.getBookStockByIsbn = async (isbn, raw = false) => {
    try{
        const bookStock = await models.book_stock.findOne({
            raw: raw,
            include:
                [
                    {
                        model: models.book,
                        as: "book",
                        where: ({ isbn: isbn }),
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


        if(bookStock){
            const bookId = bookStock.book_id;
            const avatar = await bookImgService.getAvatarImgByBookId(bookId);

            if(raw){
                bookStock.avatar = avatar.src;
            }
            else{
                // bookStock.da
                bookStock.dataValues.avatar = avatar.src;
            }

        }

        return bookStock;


    }
    catch (e) {
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
                    where: {

                    },
                    include:
                        [
                            {
                                model: models.category,
                                as: "category_id_categories",
                                where: {

                                }
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
                                where: {

                                }
                            },
                        ],
                },
            ],
        where: {

        }
    });
}

