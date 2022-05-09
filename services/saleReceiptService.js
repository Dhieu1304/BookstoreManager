const {models} = require("../models");


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