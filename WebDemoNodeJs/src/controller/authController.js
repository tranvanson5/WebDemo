const authService = require('../service/authService'); // Correct import

const authController = {
    signup: async (req, res) => {
        return authService.signup(req, res);
    },
    signin: async (req, res) => {
        return authService.signin(req, res);
    },
};

module.exports = authController;
