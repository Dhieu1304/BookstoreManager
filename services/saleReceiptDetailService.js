const {models} = require("../models");


exports.addSaleReceiptDetail = async (book_id, sale_receipt_id, quantity, price) => {
    try{
        const saleReceiptDetail = await models.sale_receipt_detail.create(
            {
                book_id: book_id,
                sale_receipt_id: sale_receipt_id,
                quantity: quantity,
                price: price
            }
        );
        return saleReceiptDetail;
    }catch (e) {
        console.log(e);
    }
}
