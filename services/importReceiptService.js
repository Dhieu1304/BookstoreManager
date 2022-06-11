const {models} = require("../models");

const { Op, col} = require("sequelize")
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

exports.getAndCountAllImportReceipts = async (page, limit, raw = false) => {
    try{
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const importReceiptsAndCount = await models.import_receipt.findAndCountAll(
            {
                raw: raw,
                // include:
                //     [
                //         {
                //             model: models.import_receipt_detail,
                //             as: "import_receipt_details",
                //             attributes: [
                //                 [sequelize.fn('count', sequelize.col('import_receipt_details.book_id')), 'count_details'],
                //                 [sequelize.fn('sum',  sequelize.col('import_receipt_details.quantity')), 'sum_quantity'],
                //             ],
                //             group:  sequelize.col("import_receipt_details.report_receipt_id"),
                //         },
                //     ],
                // attributes: [
                //     sequelize.col("import_receipt_details.report_receipt_id"),
                // ],
                offset: (page - 1) * limit,
                limit: limit
            }
        );

        const rows = importReceiptsAndCount.rows;
        const count = importReceiptsAndCount.count;

        let countRow = 0;
        for (let importReceipt of rows){
            let importReceiptDetail = await models.import_receipt_detail.findOne({
                raw: raw,
                where: ({
                    report_receipt_id: importReceipt.id,
                }),
                attributes: [
                    [sequelize.fn('count', sequelize.col('book_id')), 'count_details'],
                    [sequelize.fn('sum',  sequelize.col('quantity')), 'sum_quantity'],
                ],
            })
            console.log(importReceiptDetail);
            rows[countRow]["import_receipt_details"] = importReceiptDetail;
            countRow++;
        }

        return {rows, count};
    }catch (e) {
        console.log(e);
    }
}