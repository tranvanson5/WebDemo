const { connectDatabase } = require('./database');
const User = require('../model/user'); // Import User model
const Role = require('../model/role'); // Import Role model

const initializeDatabase = async () => {
    // Connect to the database
    connectDatabase();

    try {

        await User.sync();
        await Role.sync();


        console.log('Initialization successful');
    } catch (error) {
        console.error('Initialization failed:', error);
    }
}

module.exports = initializeDatabase;
