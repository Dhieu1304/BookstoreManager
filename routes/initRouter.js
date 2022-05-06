const homeRouter = require("./homeRouter");
const authRouter = require("./authRouter");
const layoutRouter = require("./layoutRouter");
const errorRouter = require("./errorRouter");
const chartRouter = require("./chartRouter");
const tableRouter = require("./tableRouter");
const authController = require('../controllers/authController');

module.exports.initRouter = (app) => {

    //middleware get userInfo
    app.use(function (req, res, next) {
        if (req.user) {
            res.locals.user = req.user;
        }
        next();
    })

    // app.use('/', /*authController.checkAuthenticated,*/ homeRouter);
    app.use('/', authController.checkAuthenticated, homeRouter);
    app.use('/layout', layoutRouter);
    app.use('/error', errorRouter);
    app.use('/chart', chartRouter);
    app.use('/table', tableRouter);
    app.use('/', authRouter);
}
