const initModels = require('./init-models');
const db = require('../config/book_store_db');

module.exports = {
    models: initModels(db),
}
