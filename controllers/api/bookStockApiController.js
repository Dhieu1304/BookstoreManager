
const bookStockService = require('../../services/bookStockService');

module.exports.getAllBookStock = async (req, res) => {


    const bookStocks = await bookStockService.getAllBookStock(false)
    res.status(200).json({bookStocks});
}

