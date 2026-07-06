const express = require('express');

const router = express.Router();
const { loginLimiter, signupLimiter, verifyOtpLimiter } = require("../rateLimiters")
const { login, signup, verifyOtp } = require('../controllers/auth.controller');



router.post('/login', loginLimiter, login)

router.post('/signup', signupLimiter, signup);

router.post('/verify-otp', verifyOtpLimiter, verifyOtp);

module.exports = router;
