const homeRouter = require("./homeRouter");
const authRouter = require("./authRouter");
const layoutRouter = require("./layoutRouter");

module.exports.initRouter = (app) => {
    app.use('/', homeRouter);
    app.use('/auth', authRouter);
    app.use('/layout', layoutRouter);
}
