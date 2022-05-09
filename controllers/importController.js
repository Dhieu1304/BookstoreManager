
const importReceiptService = require('../services/importReceiptService');
const importReceiptDetailService = require("../services/importReceiptDetailService");


exports.getImportPage = (req, res) => {
    res.render('import/import', {title: 'Import'});
}

exports.addImportReceipt = async (req, res) => {


    const data = req.body;



    const bookIds = data.bookIds;
    const prices = data.prices;
    const quantitys = data.quantitys;

    const totalPrice = data.totalPrice;

    const createAt = new Date();

    const importReceipt = await importReceiptService.addImportReceipt(createAt, totalPrice);
    const importReceiptId = importReceipt.id;

    const importReceiptDetailSize = bookIds.length;


    if(Array.isArray(bookIds)){
        for await (const bookId of bookIds) {
            const quantity = quantitys.shift();
            const price = prices.shift();
            const importReceiptDetail = await addImportReceiptDatail(bookId, importReceiptId, quantity, price)
        }
    }else {
        const bookId = bookIds;
        const quantity = quantitys;
        const price = prices;
        const importReceiptDetail = await addImportReceiptDatail(bookId, importReceiptId, quantity, price)
    }


    // // console.log(importReceipt);

    // const bookId = 5;
    // const importReceiptId = 2;
    // const quantity = 10;
    // const priceD = 300000;

    // const importReceiptDetail = addImportReceiptDatail(bookId, importReceiptId, quantity, priceD);

    //res.redirect('/import');


    //Test
    // const createAt = new Date();
    // const totalPrice = 1000;
    // const importReceipt = await importReceiptService.addImportReceipt(createAt, totalPrice);
    // const importReceiptId = importReceipt.id;
    // res.redirect('/import');


    //Test
    // const bookId = 5;
    // const importReceiptId = 2;
    // const quantity = 10;
    // const priceD = 300000;
    //
    // const importReceiptDetail = addImportReceiptDatail(bookId, importReceiptId, quantity, priceD);

    res.redirect('/import');

}



addImportReceiptDatail = async (bookId, importReceiptId, quantity, price) => {
    const importReceiptDetail = await importReceiptDetailService.addImportReceiptDetail(bookId, importReceiptId, quantity, price);
    console.log(importReceiptDetail);
    return importReceiptDetail;
}


