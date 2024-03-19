const express = require('express');
const profileRouter = express.Router();
const profileController = require("../controller/profileController"); // Correct import
const middleware = require("../service/middleware"); // Import middleware after it's defined


profileRouter.get('/', (req, res, next) => middleware(req, res, next, ['ROLE_USER','ROLE_PM','ROLE_ADMIN']), profileController.profile);

module.exports = profileRouter;
