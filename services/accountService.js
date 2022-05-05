const {models} = require("../models");

module.exports.getAccountById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const account = await models.account.findOne({
                where: {
                    id: id
                },
                raw: true
            });

            if (account) {
                resolve(account);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports.getAccountByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const account = await models.account.findOne({
                where: {
                    email: email
                },
                raw: true
            });

            if (account) {
                resolve(account);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
