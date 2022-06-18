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




exports.getAllSaleReceiptDetailsBySaleReceiptId = async (saleId, page, limit, raw = false) => {
    try{

        let options = {
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
        }



        
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        if(limit !== -1){
            options.offset = (page - 1) * limit;
            options.limit = limit;
        }




        const saleReceiptDetailsAndCount = await models.sale_receipt_detail.findAndCountAll(options);

        const saleReceiptDetails = saleReceiptDetailsAndCount.rows;
        const count = saleReceiptDetailsAndCount.count;



        if(saleReceiptDetails && saleReceiptDetails.length > 0){

            const rows = [];
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

                rows.push(saleReceiptDetail);


            }

            return {rows, count};
        }
        return null;


    }
    catch (e) {
        console.log(e);
    }
}
