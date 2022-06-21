const {models} = require("../models");
const { Op } = require("sequelize")
const  sequelize = require("sequelize")

const bookImgService = require("../services/bookImgService");


exports.addImportReceiptDetail = async (book_id, import_receipt_id, quantityStr, priceStr) => {
    try{
        const price = parseFloat(priceStr) || 0;
        const quantity = parseInt(quantityStr) || 0;
        const importReceiptDetail = await models.import_receipt_detail.create(
            {
                book_id: book_id,
                report_receipt_id: import_receipt_id,
                quantity: quantity,
                price: price,
            }
        );

        const bookStocks = await models.book_stock.findAll({
            where: ({
                book_id: book_id,
            })
        })


        if(bookStocks.length !== 0){
            const bookStock = bookStocks[0];

            const oldQuantity = bookStock.quantity;
            const newQuantity = oldQuantity + quantity;

            bookStock.update({
                quantity: newQuantity
            })
            await bookStock.save();
        }


        return importReceiptDetail;
    }catch (e) {
        console.log(e);
    }
}


exports.getBookIdsByImportReceiptId = async (importId, raw = false) => {
    try {
        const importReceiptDetails = await models.import_receipt_detail.findAll({
            raw: raw,
            attributes: [
                'book_id'
            ],
            where: {
                report_receipt_id: importId
            }
        })

        if(importReceiptDetails){
            const book_ids = importReceiptDetails.map(function (importReceiptDetail){
                return importReceiptDetail.book_id;
            });
            return book_ids;
        }else {
            return [];
        }


    }catch (e) {
        console.log(e);
    }
}


exports.getAllImportReceiptDetailsByImportReceiptId = async (importId, page, limit, raw = false) => {
    try{

        let options = {
            raw: raw,
            where: ({
                report_receipt_id: importId
            }),

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
        }


        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        if(limit !== -1){
            options.offset = (page - 1) * limit;
            options.limit = limit;
        }



        // const importReceiptsAndCount = await models.import_receipt.findAndCountAll(options);



        const importReceiptDetailsAndCount = await models.import_receipt_detail.findAndCountAll(options);

        const importReceiptDetails = importReceiptDetailsAndCount.rows;
        const count = importReceiptDetailsAndCount.count;


        // const importReceiptDetails = await models.import_receipt_detail.findAll(options);


        if(importReceiptDetails && importReceiptDetails.length > 0){

            const rows = [];
            for (let importReceiptDetail of importReceiptDetails){

                const bookId = importReceiptDetail.book_id;
                const avatar = await bookImgService.getAvatarImgByBookId(bookId);

                if(raw){
                    importReceiptDetail.avatar = avatar.src;
                }
                else{
                    // importReceiptDetail.da
                    importReceiptDetail.dataValues.avatar = 1 //avatar.src;
                    importReceiptDetail._previousDataValues.avatar = 1// avatar.src;
                }

                rows.push(importReceiptDetail);


            }

            return {rows, count};
        }
        return null;


    }
    catch (e) {
        console.log(e);
    }
}
