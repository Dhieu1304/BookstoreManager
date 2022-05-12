
const authorService = require('../../services/authorService');

module.exports.getAllAuthorInfor = async (req, res) => {
    const authors = await authorService.getAllAuthorInfor(true)
    res.status(200).json({authors});
}

