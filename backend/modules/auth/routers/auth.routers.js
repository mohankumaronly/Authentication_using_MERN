const express = require('express');
const validate = require('../validators/auth.validate');
const { registerSchema, loginSchema, resetPasswordSchema, forgotPasswordSchema } = require('../validators/auth.validators');
const limiter = require('../../../middlewares/rate.limiter');
const protect = require('../../../middlewares/token.verification');
const { register, login, logOut } = require('../controllers/auth.controller');
const { forgotPassword, resetPassword } = require('../controllers/auth.forgot.controller');
const refreshTokenController = require('../controllers/auth.refreshToken.controller');
const verifyEmail = require('../controllers/verifyEmail.controller');
const getMe = require('../controllers/auth.me.controller');
const { googleAuthStart, googleAuthCallback } = require('../controllers/googleAuthCallback.controller');

const authRouter = express.Router();
authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', limiter, validate(loginSchema), login);
authRouter.get('/verify-email/:token', verifyEmail);
authRouter.post('/refresh-token', refreshTokenController);
authRouter.post('/forgot-password', limiter, validate(forgotPasswordSchema), forgotPassword);
authRouter.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);
authRouter.post('/logout', logOut);
authRouter.get('/me', getMe);
authRouter.get('/google', googleAuthStart);
authRouter.get("/google/callback", googleAuthCallback);


module.exports = authRouter;

