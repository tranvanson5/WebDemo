const express = require('express');
const app = express();
require('dotenv').config();
const initializeDatabase = require('./src/common/initializeDatabase'); // Đây là hàm, không cần dấu {}
const routes = require('./src/routes/routes');


const host = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || 3000;

// Khởi tạo cơ sở dữ liệu
initializeDatabase();
app.use(express.json());
app.use("/api",routes)

app.listen(port, host, () => {
    console.log(`\x1b[32mServer is running at http://${host}:${port}\x1b[0m`);
});
