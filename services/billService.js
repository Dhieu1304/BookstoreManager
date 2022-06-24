const { models } = require('../models');

exports.getAllBillInfor = async (raw = false) => {
    try{
        const bills = await models.bill.findAll({
            raw: raw,
            where: {

            }
        });

        return bills;
    }catch (e){
        console.log(e);
    }

}


exports.addBill = async (create_at, customer_id, money_received_str) => {
    try{
        const money_received = parseFloat(money_received_str) || 0
        const bill = await models.bill.create(
            {
                create_at: create_at,
                customer_id: customer_id,
                money_received: money_received
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
            const newDept = oldDept - money_received;

            customer.update({
                dept: newDept
            })

            await customer.save();
            let x = 1;
        }


        return bill;
    }catch (e) {
        console.log(e);
    }
}



exports.getAndCountAllBills = async (page, limit, filter, raw = false) => {
    try{
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        let options = {
            order: [
                // ['id', 'ASC'],
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
                case "CUSTOMER":
                    options.include[0].where.phone = filter.filterCustomer;
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


        const billsAndCount = await models.bill.findAndCountAll(options);

        const rows = billsAndCount.rows;
        const count = billsAndCount.count;

        return {rows, count};
    }catch (e) {
        console.log(e);
    }
}




exports.getBillById = async (id, raw = false) => {
    try{
        const bill = await models.bill.findOne(
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

        return bill;
    }catch (e) {
        console.log(e);
    }
}