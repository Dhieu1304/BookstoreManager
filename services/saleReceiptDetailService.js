const {models} = require("../models");


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
