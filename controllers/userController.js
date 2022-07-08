const User = require("../models/UserModel");
const CLIENT_URL = "http://localhost:3000/login"


exports.loginSuccess = async (req, res, next) => {
    try {
            res.status(200).json({
                success: true,
                message: "login success",
                user: req.user
            })
        
    } catch (error) {
        console.log(error);
    }
}

exports.getAllusers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id }}).select([
            'email',
            'userName',
            'profilePic',
            '_id'
        ]);
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.logout = async (req, res, next) => {
    try {
        req.logout()
        res.redirect(CLIENT_URL)
    } catch (e) {
        console.log(e);
    }
}
