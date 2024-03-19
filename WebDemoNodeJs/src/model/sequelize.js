const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.MYSQL_HOST||"",
    port: process.env.MYSQL_POST||"",
    database: process.env.MYSQL_DATABASE||"",
    username: process.env.MYSQL_USER||"",
    password: process.env.MYSQL_PASSWORD||"",
    logging: false,
});

module.exports = sequelize;
