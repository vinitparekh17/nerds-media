const jwt = require('jsonwebtoken')

exports.createToken = (user) => {
    const token = jwt.sign({
        id: user._id,
        userName: user.userName,
        email: user.email,
        profilePic: user.profilePic
    }, process.env.JWT_SECRET, { expiresIn: '1h' })

    return token;
}
