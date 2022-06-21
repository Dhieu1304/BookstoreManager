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

exports.getAndCountAllImportReceipts = async (page, limit, filter, raw = false) => {
    try{
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        let options = {
            order: [
                // ['id', 'ASC'],
            ],
            where: {
    
            },

            raw: raw,
        }
        
        if(limit !== -1){
            options.offset = (page - 1) * limit;
            options.limit = limit;
        }


        if(filter){
            const orderBy = filter.orderBy || "ID";
            const order = filter.order || "ASC";

            let orderOption;

            switch (orderBy){
                case "ID":
                    orderOption = ["id", order];
                    break;
                case "PRICE":
                    orderOption = ["price", order];
                    break;
                case "CREATE_AT":
                    orderOption = ["create_at", order];
                    break;
                default:
                    orderOption = ["id", order];
                    break;
            }




            options.order = [
                orderOption
            ];

            switch (filter.typeOfFilter){
                case "ID":
                    options.where.id = parseInt(filter.filterId) || 1;
                    break;
                case "DATE":{
                    const filterDate = new Date(filter.filterDate)
                    const filterDateNext = new Date(filterDate);
                    filterDateNext.setDate(filterDate.getDate()+1);


                    options.where.create_at  = {
                        [Op.gte]: filter.filterDate,
                        [Op.lte]: filterDateNext
                    };
                }
                break;
                case "TIME":{

                    const month = parseInt(filter.filterMonth);
                    const year = parseInt(filter.filterYear);

                    let startDate = null;
                    let endDate = null;

                    if (month === -1){
                        startDate = new Date(year, 0, 1);
                        endDate = new Date(year + 1, 0, 1);
                    }
                    else{
                        startDate = new Date(year, month , 1);
                        endDate = new Date(year, startDate.getMonth() + 1, 1);
                    }



                    options.where.create_at  = {
                        [Op.gte]: startDate,
                        [Op.lte]: endDate
                    };
                }
                break;
                case "TIME_STATE":{

                    const minDate =  new Date(filter.filterMinDate) || new Date(2010,0,1);

                    //Vì maxDate tính từ đầu ngày, nên ta phải lấy ngày tiếp theo của nó
                    const maxDate = new Date(filter.filterMaxDate) || new Date();
                    const maxDateNext = new Date(maxDate);
                    maxDateNext.setDate(maxDate.getDate()+1);



                    options.where.create_at  = {
                        [Op.gte]: minDate,
                        [Op.lte]: maxDateNext
                    };
                }
                    break;
                case "ALL":
                    break;
                default:
                    break;
                    
                      
            }
        }


        const importReceiptsAndCount = await models.import_receipt.findAndCountAll(options);

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


exports.getImportReceiptById = async (id, raw = false) => {
    try{
        const importReceipt = await models.import_receipt.findOne(
            {
                where: {
                    id: id
                },
                raw: raw
            }
        );

        return importReceipt;
    }catch (e) {
        console.log(e);
    }
}