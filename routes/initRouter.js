const homeRouter = require("./homeRouter");
const authRouter = require("./authRouter");
const layoutRouter = require("./layoutRouter");
const errorRouter = require("./errorRouter");
const chartRouter = require("./chartRouter");
const tableRouter = require("./tableRouter");
const accountRouter = require("./accountRouter");
const saleRouter = require("./saleRouter");
const importRouter = require("./importRouter");
const billRouter = require("./billRouter");
const apiRouter = require("./api/initApiRouter");
const customerRouter = require("./customerRouter");
<<<<<<< HEAD
const statisticsRouter = require("./statisticsRouter");
const authController = require('../controllers/authController');
=======
const regulationRouter = require("./regulationRouter");
const authController = require("../controllers/authController");
>>>>>>> a64cf1a4db71166b0284db04476c2417e3205dc8

module.exports.initRouter = (app) => {

    //middleware get userInfo
    app.use(function (req, res, next) {
        if (req.user) {
            res.locals.user = req.user;
        }
        next();
    })

    app.use('/auth', authRouter);
    // app.use('/', authController.checkAuthenticated, homeRouter);
    app.use('/', /*authController.checkAuthenticated,*/ homeRouter);
    app.use('/layout', layoutRouter);
    app.use('/error', errorRouter);
    app.use('/chart', chartRouter);
    app.use('/table', tableRouter);
    app.use('/account', accountRouter);
  
    app.use('/sale', saleRouter);
    app.use('/import', importRouter);
    app.use('/bill', billRouter);
    app.use('/api', apiRouter);
    app.use('/customer', customerRouter);
<<<<<<< HEAD
    app.use('/statistics', statisticsRouter);
    
=======
    app.use('/regulation', regulationRouter);
>>>>>>> a64cf1a4db71166b0284db04476c2417e3205dc8
}
