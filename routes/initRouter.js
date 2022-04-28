const homeRouter = require("./homeRouter");

module.exports.initRouter = (app) => {
    app.use('/', homeRouter);
}
