const {models} = require("../models");

const bookImgService = require("../services/bookImgService");


exports.addSaleReceiptDetail = async (book_id, sale_receipt_id, quantityStr, priceStr) => {
    try{
        const price = parseFloat(priceStr) || 0;
        const quantity = parseInt(quantityStr) || 0;
        const saleReceiptDetail = await models.sale_receipt_detail.create(
            {
                book_id: book_id,
                sale_receipt_id: sale_receipt_id,
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
            const newQuantity = oldQuantity - quantity;

            bookStock.update({
                quantity: newQuantity
            })

            await bookStock.save();

        }


        return saleReceiptDetail;
    }catch (e) {
        console.log(e);
    }
}



exports.getAllSaleReceiptDetailsBySaleReceiptId = async (saleId, raw = false) => {
    try{
        const saleReceiptDetails = await models.sale_receipt_detail.findAll({
            raw: raw,
            where: ({
                sale_receipt_id: saleId
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


        if(saleReceiptDetails && saleReceiptDetails.length > 0){

            const saleReceiptDetailsResult = [];
            for (let saleReceiptDetail of saleReceiptDetails){

                const bookId = saleReceiptDetail.book_id;
                const avatar = await bookImgService.getAvatarImgByBookId(bookId);

                if(raw){
                    saleReceiptDetail.avatar = avatar.src;
                }
                else{
                    // saleReceiptDetail.da
                    saleReceiptDetail.dataValues.avatar = 1 //avatar.src;
                    saleReceiptDetail._previousDataValues.avatar = 1// avatar.src;
                }

                saleReceiptDetailsResult.push(saleReceiptDetail);


            }

            return saleReceiptDetailsResult;
        }
        return [];


    }
    catch (e) {
        console.log(e);
    }
}
