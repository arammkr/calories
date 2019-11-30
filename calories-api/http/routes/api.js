const express = require('express');
const { authMiddleware } = require('@http/middlewares');
const HealthRouter = require('./health');
const AuthRouter = require('./auth');
const UserRouter = require('./user');
const MealRouter = require('./meal');

const router = express.Router();

router.use('/health', HealthRouter);
router.use('/auth', AuthRouter);
router.use('/user', authMiddleware, UserRouter);
router.use('/meal', authMiddleware, MealRouter);

module.exports = router;
