const {models} = require("../models");
const { Op } = require("sequelize")
const  sequelize = require("sequelize");


class StatisticsMonth {
    constructor(year, month, importTotalMoney, saleTotalMoney, billTotalMoney) {
        this.year = year;
        this.month = month;
        this.importTotalMoney = importTotalMoney;
        this.saleTotalMoney = saleTotalMoney;
        this.billTotalMoney = billTotalMoney;
    }
}

exports.getAllStatisticMonths = async (filter, raw = false) => {
    try{


        const importOptions = {
            raw: raw,
            attributes: [
                [sequelize.fn('sum',  sequelize.col('price')), 'importTotalMoney'],
                [sequelize.fn('date_trunc', 'month',  sequelize.col('create_at')), 'created_at_month'],
            ],
            order: [[sequelize.col('created_at_month'), 'ASC']],
            group: sequelize.col('created_at_month'),
            where: {

            }
        }


        const saleOptions = {
            raw: raw,
            attributes: [
                [sequelize.fn('sum',  sequelize.col('price')), 'saleTotalMoney'],
                [sequelize.fn('date_trunc', 'month',  sequelize.col('create_at')), 'created_at_month'],
            ],

            order: [[sequelize.col('created_at_month'), 'ASC']],
            group: sequelize.col('created_at_month'),
            where: {

            }
        }


        const billOptions = {
            raw: raw,
            attributes: [
                [sequelize.fn('sum',  sequelize.col('money_received')), 'billTotalMoney'],
                [sequelize.fn('date_trunc', 'month',  sequelize.col('create_at')), 'created_at_month'],
            ],

            order: [[sequelize.col('created_at_month'), 'ASC']],
            group: sequelize.col('created_at_month'),
            where: {

            }
        }
        // if(limit !== -1){
        //     options.offset = (page - 1) * limit;
        //     options.limit = limit;
        // }



        if(filter){
            switch (filter.typeOfFilter){

                case "TIME": default:{
                    const month = parseInt(filter.filterMonth) || -1;
                    const year = parseInt(filter.filterYear) || 2022;

                    let startDate = null;
                    let endDate = null;

                    if (month === -1){
                        startDate = new Date(year, 0, 1);
                        endDate = new Date(year + 1, 0, 1);
                    }
                    else{
                        startDate = new Date(year, month , 1);
                        endDate = new Date(year, startDate.getMonth() + 1, 1);
                    }



                    importOptions.where.create_at  = {
                        [Op.gte]: startDate,
                        [Op.lte]: endDate
                    };
                    saleOptions.where.create_at  = {
                        [Op.gte]: startDate,
                        [Op.lte]: endDate
                    };
                    billOptions.where.create_at  = {
                        [Op.gte]: startDate,
                        [Op.lte]: endDate
                    };
                }
                break;

                // case "TIME_STATE":{
                //
                //     const minMonth = parseInt(filter.filterMinMonth) || 1;
                //     const minYear = parseInt(filter.filterMinYear) || new Date().getFullYear();
                //
                //     const maxMonth = parseInt(filter.filterMaxMonth) || 2;
                //     const maxYear = parseInt(filter.filterMaxYear) || new Date().getFullYear();
                //
                //
                //
                //     let startDate = null;
                //     let endDate = null;
                //
                //
                //     startDate = new Date(minYear, minMonth , 1);
                //     endDate = new Date(maxYear, maxMonth + 1, 1);
                //
                //
                //
                //
                //     importOptions.where.create_at  = {
                //         [Op.gte]: startDate,
                //         [Op.lte]: endDate
                //     };
                //     saleOptions.where.create_at  = {
                //         [Op.gte]: startDate,
                //         [Op.lte]: endDate
                //     };
                //     billOptions.where.create_at  = {
                //         [Op.gte]: startDate,
                //         [Op.lte]: endDate
                //     };
                // }
                //     break;
                case "ALL":
                    break;
            }
        }
        



        const statisticsMonths = [];




        const importStatisticsMonths = await models.import_receipt.findAll(importOptions);

        const saleStatisticsMonths = await models.sale_receipt.findAll(saleOptions);

        const billStatisticsMonths = await models.bill.findAll(billOptions);



        const dates = [];

        if(importStatisticsMonths && importStatisticsMonths.length > 0){
            let firstDateImport = importStatisticsMonths[0].created_at_month;
            let lastDateImport = importStatisticsMonths[importStatisticsMonths.length-1].created_at_month;
            dates.push(firstDateImport, lastDateImport);
        }
        if(saleStatisticsMonths && saleStatisticsMonths.length > 0){
            let firstDateSale = saleStatisticsMonths[0].created_at_month;
            let lastDateSale = saleStatisticsMonths[saleStatisticsMonths.length-1].created_at_month;
            dates.push(firstDateSale, lastDateSale);
        }



        if(billStatisticsMonths && billStatisticsMonths.length > 0){
            let firstDateBill = billStatisticsMonths[0].created_at_month;
            let lastDateBill = billStatisticsMonths[billStatisticsMonths.length-1].created_at_month;
            dates.push(firstDateBill, lastDateBill);
        }


        dates.sort();
        const minMonth = dates[0].getMonth();
        const minYear = dates[0].getFullYear();

        const maxMonth = dates[dates.length - 1].getMonth();
        const maxYear = dates[dates.length - 1].getFullYear();


        for (let y = minYear; y <= maxYear; y++){

            let maxMonthInYear = 11;
            if (y === maxYear){
                maxMonthInYear = maxMonth;
            }

            for (let m = minMonth; m <= maxMonthInYear; m++){

                let importStatisticsMonth = importStatisticsMonths[0];
                let importTotalMoney = 0;
                if (importStatisticsMonth){
                    if (importStatisticsMonth.created_at_month.getFullYear() === y && importStatisticsMonth.created_at_month.getMonth() === m){
                        importTotalMoney = importStatisticsMonth.importTotalMoney;
                        importStatisticsMonths.shift();
                    }
                }

                let saleStatisticsMonth = saleStatisticsMonths[0];
                let saleTotalMoney = 0;
                if (saleStatisticsMonth){
                    if (saleStatisticsMonth.created_at_month.getFullYear() === y && saleStatisticsMonth.created_at_month.getMonth() === m){
                        saleTotalMoney = saleStatisticsMonth.saleTotalMoney;
                        saleStatisticsMonths.shift();
                    }
                }


                let billStatisticsMonth = billStatisticsMonths[0];
                let billTotalMoney = 0;
                if (billStatisticsMonth){
                    if (billStatisticsMonth.created_at_month.getFullYear() === y && billStatisticsMonth.created_at_month.getMonth() === m){
                        billTotalMoney = billStatisticsMonth.billTotalMoney;
                        billStatisticsMonths.shift();
                    }
                }

                if (importTotalMoney === 0 && saleTotalMoney === 0 && billTotalMoney === 0){

                }else {
                    const statisticsMonth = new StatisticsMonth(y, m, importTotalMoney, saleTotalMoney, billTotalMoney);
                    statisticsMonths.push(statisticsMonth);
                }



            }
        }




        return statisticsMonths;


    }catch (e){
        console.log(e);
    }
}