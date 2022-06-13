const { models } = require('../models');
const Op = require('sequelize').Op;

exports.getAllCustomerInfor = async (raw = false) => {
    try{
        const customers = await models.customer.findAll({
            raw: raw,
            where: {

            }
        });

        return customers;
    }catch (e){
        console.log(e);
    }

}


exports.getCustomerInforByPhoneNumber = async (phone, raw = false) => {
    try{
        const customers = await models.customer.findAll({
            raw: raw,
            where:  ({ phone: phone }),
        });

        if(customers.length == 0){
            return false;
        }

        return customers[0];
    }catch (e){
        console.log(e);
    }

}

exports.addNewCustomer = async(name ,phone , email ,address) => {
    try{
        

        const customer = await models.customer.create(
            {
                name: name,
                phone: phone,
                email: email,
                address: address,
                dept: 0
            }
        );

        return customer;
    }catch (e) {
        console.log(e);
    }
}

module.exports.getCustomersFilter = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let option = {
                offset: (filter.page - 1) * filter.limit,
                limit: filter.limit,
                order: ['id'],
                raw: true
            };

            if (filter.search !== '') {
                option.where = {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${filter.search}%`
                            }
                        },
                        {
                            address: {
                                [Op.like]: `%${filter.search}%`
                            }
                        },
                        {
                            phone: {
                                [Op.like]: `%${filter.search}%`
                            }
                        },
                        {
                            email: {
                                [Op.like]: `%${filter.search}%`
                            }
                        }
                    ]
                }
            }

            const customers = await models.customer.findAndCountAll(option);

            if (customers) {
                resolve(customers);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports.getCustomerById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const customer = await models.customer.findOne({where: {id}, raw: true});

            if (customer) {
                resolve(customer);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports.editCustomer = (customerInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const customer = await models.customer.findOne({where: {id: customerInput.id}});

            if (customer) {
                customer.name = customerInput.name;
                customer.phone = customerInput.phone;
                customer.email = customerInput.email;
                customer.address = customerInput.address;
                customer.dept = customerInput.dept;
                await customer.save();
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
