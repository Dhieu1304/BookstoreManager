const {models} = require("../../models");
module.exports.changeAccountPassword = (email, hashPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const account = await models.account.findOne({
                where: {
                    email: email
                }
            });

            if (account) {
                account.password = hashPassword;
                await account.save();
                resolve(account);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}