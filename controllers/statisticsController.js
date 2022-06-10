

const statisticsService = require('../services/statisticsService');


exports.getStatisticsDayPage = async (req, res) => {



    res.render('statistics/statisticsByDay', {title: 'Statistics day'});
}


exports.getStatisticsMonthPage = async (req, res) => {



    res.render('statistics/statisticsByMont', {title: 'Statistics month'});
}


exports.getStatisticsYearPage = async (req, res) => {



    res.render('statistics/statisticsByYear', {title: 'Statistics year'});
}


