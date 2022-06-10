const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelizeLocal = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

const sequelizeHeroku = new Sequelize(process.env.HDB_DATABASE, process.env.HDB_USERNAME, process.env.HDB_PASSWORD, {
    host: process.env.HDB_HOST,
    dialect: 'postgres',
    port: process.env.HDB_PORT,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// const sequelize = (process.env.DB_ENV === 'HDB') ? sequelizeHeroku : sequelizeLocal;
const sequelize = sequelizeHeroku;

module.exports = sequelize;
