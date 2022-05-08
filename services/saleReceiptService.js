const {models} = require("../models");


exports.addSaleReceipt = async (create_at, customer_id, price) => {
    try{
        const saleReceipt = await models.sale_receipt.create(
            {
                create_at: create_at,
                customer_id: customer_id,
                price: price
            }
        );
        return saleReceipt;
    }catch (e) {
        console.log(e);
    }
}