const { loginValidator, signUpValidator } = require('@http/validators');
const { validatorMiddleware, authMiddleware, aclMiddleware } = require('@http/middlewares');
const AuthController = require('@http/controllers/auth');
const { Router } = require('express');
const router = Router();

router.post('/login', validatorMiddleware(loginValidator), AuthController.login);
router.post('/signup', validatorMiddleware(signUpValidator), AuthController.signUp);
router.get('/me', authMiddleware, aclMiddleware, AuthController.getAuthUser);

module.exports = router;
