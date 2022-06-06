
const categoryService = require('../../services/categoryService');

module.exports.getAllCategoryInfor = async (req, res) => {
    const categorys = await categoryService.getAllCategoryInfor(true)
    res.status(200).json({categorys});
}



module.exports.getCategoryByName = async (req, res) => {
    const name = req.params.name;
    const category = await categoryService.getCategoryByName(name, true)
    res.status(200).json({category});
}


module.exports.addCategory = async (req, res) => {


    const data = req.body;
    const categoryName = data.categoryName


    const category = await categoryService.addCategory(categoryName);

    res.status(200).json({category});
}


