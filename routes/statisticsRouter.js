const express = require('express');
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");

router.get('/day', statisticsController.getStatisticsDayPage);
router.get('/month', statisticsController.getStatisticsMonthPage);
router.get('/year', statisticsController.getStatisticsYearPage);

module.exports = router;
