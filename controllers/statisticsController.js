

const statisticsService = require('../services/statisticsService');


exports.getStatisticsDayPage = async (req, res) => {



    res.render('statistics/statisticsByDay', {title: 'Statistics day'});
}


exports.getStatisticsMonthPage = async (req, res) => {

    const data = req.query;
    // const page = data.page || 1;
    // const limit = data.limit || 10;

    const filter = {
        typeOfFilter : data.typeOfFilter,
        filterMonth : data.filterMonth,
        filterYear : data.filterYear,
        filterMinMonth : data.filterMinMonth,
        filterMinYear : data.filterMinYear,
        filterMaxMonth : data.filterMaxMonth,
        filterMaxYear : data.filterMaxYear
    }

    const statisticsMonths = await statisticsService.getAllStatisticMonths(filter,true);

    // const pagination = {
    //     limit: limit,
    //     page: page
    // }

    res.render('statistics/statisticsByMont', {title: 'Statistics month', filter, statisticsMonths});
}


exports.getStatisticsYearPage = async (req, res) => {



    res.render('statistics/statisticsByYear', {title: 'Statistics year'});
}


