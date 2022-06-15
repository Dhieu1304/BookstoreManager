const {models} = require("../../models");

module.exports.changeAccountPasswordById = (id, hashPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const account = await models.account.findOne({
                where: {
                    id
                }
            });

            if (account) {
                account.password = hashPassword;
                account.status = 'active';
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
