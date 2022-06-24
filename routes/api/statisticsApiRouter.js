const express = require('express');
const router = express.Router();
const statisticsApiController = require("../../controllers/api/statisticsApiController");

// router.get('/day', statisticsController.getStatisticsDayPage);
// router.get('/month', statisticsController.getStatisticsMonthPage);
router.get('/month/:year', statisticsApiController.getAllStatisticMonthByYear);
// router.get('/year', statisticsController.getStatisticsYearPage);


module.exports = router;

