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

module.exports.initRouter = (app) => {

    //middleware get userInfo
    app.use(function (req, res, next) {
        if (req.user) {
            res.locals.user = req.user;
        }
        next();
    })

    app.use('/', /*authController.checkAuthenticated,*/ homeRouter);
    // app.use('/', authController.checkAuthenticated, homeRouter);
    app.use('/layout', layoutRouter);
    app.use('/error', errorRouter);
    app.use('/chart', chartRouter);
    app.use('/table', tableRouter);
    app.use('/auth', authRouter);
    app.use('/account', accountRouter);
  
    app.use('/sale', saleRouter);
    app.use('/import', importRouter);
    app.use('/bill', billRouter);
    app.use('/api', apiRouter);
    app.use('/customer', customerRouter);
}
