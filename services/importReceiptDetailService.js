const {models} = require("../models");


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
                id: book_id,
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
