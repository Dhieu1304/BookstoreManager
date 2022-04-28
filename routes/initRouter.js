const homeRouter = require("./homeRouter");
const authRouter = require("./authRouter");

module.exports.initRouter = (app) => {
    app.use('/', homeRouter);
    app.use('/auth', authRouter);
}
