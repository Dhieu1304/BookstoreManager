const {models} = require("../models");

module.exports.getAllRegulations = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const regulations = await models.regulation.findAll({raw: true, order: ['id']});

            if (regulations) {
                resolve(regulations);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports.editlRegulation = (regulationInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const regulation = await models.regulation.findOne({where: {id: regulationInput.id}});
            if (regulation) {
                regulation.value = regulationInput.value;
                regulation.is_used = regulationInput.is_used;

                await regulation.save();
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports.getRegulationById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const regulation = await models.regulation.findOne({raw: true, where: {id: id}});

            if (regulation) {
                resolve(regulation);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
