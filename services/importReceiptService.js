const {models} = require("../models");

const { Op } = require("sequelize")
const  sequelize = require("sequelize")

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

exports.getAllImportReceipts = async (raw = false) => {
    try{
        const importReceipts = await models.import_receipt.findAll(
            {
                raw: raw,
                include:
                    [
                        {
                            model: models.import_receipt_detail,
                            as: "import_receipt_details",
                            attributes: [
                                [sequelize.fn('count', sequelize.col('import_receipt_details.book_id')), 'count_details'],
                                [sequelize.fn('sum',  sequelize.col('import_receipt_details.quantity')), 'sum_quantity'],
                            ],
                        },
                    ],
                group:  sequelize.col('id'),
            }
        );

        return importReceipts;
    }catch (e) {
        console.log(e);
    }
}