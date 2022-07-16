const User = require("../models/userModel")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// get current user details from database for authentication
exports.signin = async (req, res, next) => {
    try {
        const { email } = req.body
        const existUser = await User.findOne({ email })

        if (existUser) {

            res.status(200).json({
                success: true,
                message: "User already exists!",
                user: existUser
            });

        } else {
            const newUser = await User.create(req.body)

            if (newUser) {
                res.status(200).json({
                    success: true,
                    message: "User created successfully!",
                    user: newUser
                })
            }

        }

    } catch (error) {
        console.log(error)
    }
}

// get signin user

exports.getUser = async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(200).json({
                success: true,
                message: "User found!",
                user
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}


// get all users except current user from database
exports.getAllusers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
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
        console.error(ex);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}