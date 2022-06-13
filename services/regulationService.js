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

module.exports.editlRegulations = (regulationsInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            //sap xep
            regulationsInput.sort((a, b) => {
                return a.id - b.id;
            });

            for (const regulationInput of regulationsInput) {
                let regulation = await models.regulation.findOne({where: {id: regulationInput.id}});
                if (regulation) {
                    regulation.value = regulationInput.value;
                    regulation.is_used = regulationInput.is_used;

                    if (!await regulation.save()){
                        resolve(false);
                    }
                }
            }

            resolve(true);
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
