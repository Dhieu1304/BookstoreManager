const statisticsService = require("../../services/statisticsService");
const excelJS = require("exceljs");



exports.getAllStatisticMonthByYear = async (req, res) => {

    const data = req.query;

    const year = req.params.year;

    const statisticsMonths = await statisticsService.getAllStatisticMonthsByYear(year,true);

    res.json({statisticsMonths});

    // res.render('statistics/statisticsByMont', {title: 'Statistics month', filter, statisticsMonths});
}

