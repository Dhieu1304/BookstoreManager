
const categoryService = require('../../services/categoryService');

module.exports.getCategoryByName = async (req, res) => {
    const name = req.params.name;
    const category = await categoryService.getCategoryByName(name, true)
    res.status(200).json({category});
}

