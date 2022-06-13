
const publisherService = require('../../services/publisherService');
const categoryService = require("../../services/categoryService");

module.exports.getAllPublisherInfor = async (req, res) => {
    const publishers = await publisherService.getAllPublisherInfor(true)
    res.status(200).json({publishers});
}


module.exports.getPublisherByName = async (req, res) => {
    const name = req.params.name;
    const publisher = await publisherService.getPublisherByName(name, true)
    res.status(200).json({publisher});
}


module.exports.addPublisher = async (req, res) => {

    //Test
    const data = req.body;
    const publisherName = data.publisherName


    const publisher = await publisherService.addPublisher(publisherName);

    res.status(200).json({publisher});
}
