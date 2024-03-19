const mysql = require('mysql2');
require('dotenv').config();

function connectDatabase() {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST || "",
        port: process.env.MYSQL_PORT || "",
        user: process.env.MYSQL_USER || "",
        password: process.env.MYSQL_PASSWORD || "",
    });

    // Connect to the database
    connection.connect((err) => {
        if (err) {
            console.error('\x1b[31m', err); // Log error message in red
            return;
        }

        // Create the database if it doesn't exist
        connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`, (err) => {
            if (err) {
                console.error('\x1b[31m', err); // Log error message in red
                return;
            }

            console.log('\x1b[32m', `Database ${process.env.MYSQL_DATABASE} has been created`); // Log success message in green
        });
    });

    return connection;
}

module.exports = { connectDatabase };
