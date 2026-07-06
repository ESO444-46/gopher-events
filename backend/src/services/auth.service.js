const crypto = require('crypto')
const SendEmail = require("../utils/email")
const userRepo = require('../repositories/user.repo');
const otpRepo = require("../repositories/otp.repo")
const bcrypt = require('bcrypt')
const saltRounds = 10
const utils = require('../utils/auth.utils');

const MAX_OTP_ATTEMPTS = 5
const failedOtpAttempts = new Map()

async function signup(userData) {
    const { firstName, lastName, email, password } = userData

    const existingUser = await userRepo.findByEmail(email);

    if (existingUser) {
        throw new Error('Email already registered')
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const createdUser = await userRepo.createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    return {
        id: createdUser.id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        createdAt: createdUser.createdAt,
    };

}


async function login(userData) {
    const { email, password } = userData

    const user = await userRepo.findByEmail(email)

    if (!user) {
        throw new Error('INVALID_CREDENTIALS')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('INVALID_CREDENTIALS')
    }

    if (!user.isVerified) {
        throw new Error('EMAIL_NOT_VERIFIED')
    }

    const accessToken = utils.generateAccessToken({
        userId: user.id,
        email: user.email
    })



    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isOrganizer: user.isOrganizer
        },
        accessToken
    }
}

async function sendVerificationOtp(email) {
    const otpCode = String(crypto.randomInt(100_000, 1_000_000));
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15);

    failedOtpAttempts.delete(email)

    const record = await otpRepo.saveOtp({ email, otpCode, expiresAt });
    await SendEmail({
        to: email,
        subject: "Verify your Gopher Events account",
        html: `
      <p>Hi there,</p>
      <p>Thank you for signing up for Gopher Events! Please use the following 6-digit verification code to complete your registration. This code is valid for the next 15 minutes.</p>
      <p><strong>${otpCode}</strong></p>
      <p>If you did not request this code, please ignore this email.</p>
      <p>Best,<br />The Gopher Events Team</p>
    `
    });
}

async function verifyUserOtp({ email, otpCode }) {

    // finds otp
    const otpRecord = await otpRepo.findOtpByEmail(email)

    if (!otpRecord) {
        throw new Error("Invalid or expired verification code")
    }

    // checks expiry
    if (new Date() > otpRecord.expires_at) {
        failedOtpAttempts.delete(email)
        throw new Error("Verification code has expired")
    }

    if (otpRecord.otp_code !== otpCode) {
        const attempts = (failedOtpAttempts.get(email) || 0) + 1

        if (attempts >= MAX_OTP_ATTEMPTS) {
            failedOtpAttempts.delete(email)
            await otpRepo.deleteOtpByEmail(email)
            throw new Error("Too many incorrect attempts. Please request a new verification code")
        }

        failedOtpAttempts.set(email, attempts)
        throw new Error("Incorrect verification code")
    }

    // All checks passed, update the user to verified and delete the OTP record
    failedOtpAttempts.delete(email)

    const user = await userRepo.updateUserVerifiedStatus(email, true);

    await otpRepo.deleteOtpByEmail(email)

    const accessToken = utils.generateAccessToken({
        userId: user.id,
        email: user.email
    })

    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isOrganizer: user.isOrganizer
        },
        accessToken
    }
}

module.exports = {
    signup,
    login,
    sendVerificationOtp,
    verifyUserOtp
}

