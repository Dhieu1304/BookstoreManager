
const authorService = require('../../services/authorService');

module.exports.getAllAuthorInfor = async (req, res) => {
    const authors = await authorService.getAllAuthorInfor(true)
    res.status(200).json({authors});
}


module.exports.getAuthorsByName = async (req, res) => {
    const name = req.params.name;
    const authors = await authorService.getAuthorsByName(name, true)
    res.status(200).json({authors});
}

