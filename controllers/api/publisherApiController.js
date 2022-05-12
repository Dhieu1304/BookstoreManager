
const publisherService = require('../../services/publisherService');

module.exports.getAllPublisherInfor = async (req, res) => {
    const publishers = await publisherService.getAllPublisherInfor(true)
    res.status(200).json({publishers});
}

