const { models } = require('../models');

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

