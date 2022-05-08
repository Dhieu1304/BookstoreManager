
const bookStockService = require('../../services/bookStockService');

module.exports.getAllBookStock = async (req, res) => {


    const datas = await bookStockService.getAllBookStock(false);
    const bookStocks = datas.map(function(item){ let data = item.toJSON(); return data.book; });
    res.status(200).json({bookStocks});
}

