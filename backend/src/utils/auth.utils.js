const jwt = require('jsonwebtoken')


const generateAccessToken = function (payload) {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    )
}


module.exports = {
    generateAccessToken
}

/*

    {
        userId: 5,
        email: "varshith.vajinapelli@umn.edu"
    }
*/