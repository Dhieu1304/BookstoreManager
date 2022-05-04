const {models} = require("../../models");

module.exports.getUserbyId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await models.account.findOne({
                where: {
                    id: id
                },
                raw: true
            });

            if (user) {
                resolve(user);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports.getUserbyEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await models.account.findOne({
                where: {
                    email: email
                },
                raw: true
            });

            if (user) {
                resolve(user);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
