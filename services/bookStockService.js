const { models } = require('../models');



exports.addBookStock = async (book_id, quantity, price, status = 'active') => {
    try{
        num_page = parseInt(num_page) || 0

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

