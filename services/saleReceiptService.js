const {models} = require("../models");
const { Op } = require("sequelize")
const  sequelize = require("sequelize");


exports.addSaleReceipt = async (create_at, customer_id, priceStr) => {
    try{
        const price = parseFloat(priceStr) || 0
        const saleReceipt = await models.sale_receipt.create(
            {
                create_at: create_at,
                customer_id: customer_id,
                price: price
            }
        );


        const customers = await models.customer.findAll({
            raw: false,
            where: ({
                id: customer_id,
            })
        })


        if(customers.length !== 0){

            const customer = customers[0];

            const oldDept = customer.dept;
            const newDept = oldDept + price;

            customer.update({
                dept: newDept
            })

            await customer.save();
            let x = 1;
        }


        return saleReceipt;
    }catch (e) {
        console.log(e);
    }
}



exports.getAndCountAllSaleReceipts = async (page, limit, filter, raw = false) => {
    try{
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        let options = {
            order: [
                ['id', 'ASC'],
            ],

            include:
            [
                {
                    model: models.customer,
                    as: "customer",
                    attributes: [
                        "name", "phone",
                    ]
                }
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


        const saleReceiptsAndCount = await models.sale_receipt.findAndCountAll(options);

        const rows = saleReceiptsAndCount.rows;
        const count = saleReceiptsAndCount.count;

        let countRow = 0;
        for (let saleReceipt of rows){
            let saleReceiptDetail = await models.sale_receipt_detail.findOne({
                raw: raw,
                where: ({
                    sale_receipt_id: saleReceipt.id,
                }),
                attributes: [
                    [sequelize.fn('count', sequelize.col('book_id')), 'count_details'],
                    [sequelize.fn('sum',  sequelize.col('quantity')), 'sum_quantity'],
                ],
            })
            console.log(saleReceiptDetail);
            rows[countRow]["sale_receipt_details"] = saleReceiptDetail;
            countRow++;
        }

        return {rows, count};
    }catch (e) {
        console.log(e);
    }
}


exports.getSaleReceiptById = async (id, raw = false) => {
    try{
        const saleReceipt = await models.sale_receipt.findOne(
            {

                include:
                [
                    {
                        model: models.customer,
                        as: "customer",
                    }
                ],

                where: {
                    id: id
                },
                raw: raw
            }
        );

        return saleReceipt;
    }catch (e) {
        console.log(e);
    }
}