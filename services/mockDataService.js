const {models} = require("../models");


exports.getAllPrices = async () => {
    try{
        const prices = await models.book_stock.findAll({
            raw: true,
            attributes: [
                'price'
            ]
        });

        return prices;
    }catch (e) {
        console.log(e);
    }
}