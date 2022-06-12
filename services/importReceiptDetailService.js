const {models} = require("../models");
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


exports.getAllImportReceiptDetailsByImportReceiptId = async (importId, raw = false) => {
    try{
        const importReceiptDetails = await models.import_receipt_detail.findAll({
            raw: raw,
            nest : true,
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
        });


        if(importReceiptDetails && importReceiptDetails.length > 0){

            const importReceiptDetailsResult = [];
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

                importReceiptDetailsResult.push(importReceiptDetail);


            }

            return importReceiptDetailsResult;
        }
        return [];


    }
    catch (e) {
        console.log(e);
    }
}
