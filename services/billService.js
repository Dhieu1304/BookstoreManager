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