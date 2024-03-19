const express = require('express');
const authRouter = express.Router();
const authController = require("../controller/authController"); // Correct import

authRouter.post('/signup', authController.signup);
authRouter.post('/signin', authController.signin);

module.exports = authRouter;
