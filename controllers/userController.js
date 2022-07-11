const User = require("../models/userModel")
const CLIENT_URL = "http://localhost:3000/"

// get current user details from database for authentication
exports.loginSuccess = async (req, res, next) => {
    try {
        let user = req.session.passport.user;
        if (user !== undefined) {
            res.status(200).json({
                success: true,
                message: "login success",
                user
            })
        } else {
            res.status(200).json({
                success: false,
                message: "login fail"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

// get all users except current user from database
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

// logoout user and redirect to login screen
exports.logout = async (req, res, next) => {
    try {
        req.logout()
        res.redirect(CLIENT_URL)
    } catch (e) {
        console.log(e);
    }
}

// get all users from database
exports.allUsers = async (req, res, next) => {
    try {
        const data = await User.find({}).select([
            '_id',
            'userName',
            'profilePic'
        ]);
        if (data) {
            return res.json({
                success: true, data
            });
        } else {
            return res.json({ message: "Failed to get blogs user!" });
        }
    } catch (ex) {
        next(ex);
    }
}