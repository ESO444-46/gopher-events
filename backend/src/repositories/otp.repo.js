const prisma = require('../prisma/client');

async function saveOtp({ email, otpCode, expiresAt }) {
    return await prisma.otp.upsert({
        where: { email },
        update: {
            otp_code: otpCode,
            expires_at: expiresAt
        },
        create: {
            email,
            otp_code: otpCode,
            expires_at: expiresAt
        }
    })
}

async function findOtpByEmail(email) {
    return await prisma.otp.findUnique({
        where: { email }
    })
}

async function deleteOtpByEmail(email) {
    await prisma.otp.deleteMany({
        where: { email }
    })
}


module.exports = {
    saveOtp,
    findOtpByEmail,
    deleteOtpByEmail
}
