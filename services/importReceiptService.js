const {models} = require("../models");


exports.addImportReceipt = async (create_at, priceStr) => {
    try{
        const price = parseFloat(priceStr) || 0
        const importReceipt = await models.import_receipt.create(
            {
                create_at: create_at,
                price: price
            }
        );
        
        return importReceipt;
    }catch (e) {
        console.log(e);
    }
}