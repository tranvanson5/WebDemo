const express = require('express');
const router = express.Router(); // Define router instance

const authRouter = require('./authRoutes');
const profileRouter = require('./profileRoutes');

router.use('/auth', authRouter);
router.use('/profile', profileRouter);

module.exports = router;
