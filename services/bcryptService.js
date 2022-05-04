const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports.hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports.checkPassword = async (password, passwordHash) => {

    const match = await bcrypt.compare(password, passwordHash);

    if (match) {
        return true;
    }

    return false;
}
