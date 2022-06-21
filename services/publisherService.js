const {models} = require("../models");

exports.getAllPublisherInfor = async (raw = false) => {
    try{
        const publishers = await models.publisher.findAll({
            raw: raw,
            where: {

            }
        });

        return publishers;
    }catch (e){
        console.log(e);
    }

}

exports.addPublisher = async (name) => {
    try{
    

        const publisher = await models.publisher.create(
            {
               name: name
            }
        );

        return publisher;
    }catch (e) {
        console.log(e);
    }
}

exports.getPubliserByName = async (name, raw = false) => {
    try{
        const publisher = await models.publisher.findOne({
            raw: raw,
            where: {
                name: name
            }
        });

        return publisher;
    }catch (e){
        console.log(e);
    }

}


exports.getBookPublisherById = (publisherId) => models.publisher.findOne({
    where: ({id: publisherId}),
    raw: true
});

