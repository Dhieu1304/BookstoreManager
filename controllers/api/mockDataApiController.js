
const mockDataService = require('../../services/mockDataService');

module.exports.getAllPrices = async (req, res) => {
    const prices = await mockDataService.getAllPrices(true);

    let result = "";
    for (let price of prices){
        result+= price.price;
        result+= ', ';
    }
    console.log(result);
    res.status(200).json({prices});
}

