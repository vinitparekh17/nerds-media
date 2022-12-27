const User = require("../models/userModel")
const mailer = require('../utils/nodeMailer');
const webhook = require("../utils/webhook");

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
                mailer({
                    email: newUser.email,
                    subject: `Sign-up successfull with ${newUser.userName}`,
                    text: "Welcome to Technetic",
                    html: `<h1>Welcome to Technetic</h1><p>You have successfully registered to Technetic by ${newUser.email}, add our website to your home screen to have a better experience!</p><p>Thanks,<br>Technetic</p>`
                })
                res.status(200).json({
                    success: true,
                    message: "User created successfully!",
                    user: newUser
                })
            }
        }

    } catch (error) {
        webhook(`\`\`\`js\n${error}\`\`\``);;
        console.log(error)
    }
}


// get all users except current user from database for chat purpose
exports.getAllusers = async (req, res, next) => {
    try {
        let { page } = req.body;
        let numOfUser = await User.countDocuments();
        numOfUser = Math.ceil(numOfUser);
        let sendCount = 10;
        let userList = await User.find().skip((parseInt(page) - 1) * 10).limit(10)
        if (userList) {
            sendCount += 10;
            if (sendCount >= numOfUser) return res.status(200).json({ success: true, userList, end: true });
            return res.status(200).json({ success: true, userList, end: false });
        }
        res.status(404).json({
            success: false,
            message: "No users found!"
        })
    } catch (error) {
        webhook(`\`\`\`js\n${error}\`\`\``);
        console.log(error);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.body.id }).select([
            '_id',
            'userName',
            'profilePic',
            'email'
        ]);
        if (user) {
            return res.json({
                success: true,
                user
            });
        } else {
            return res.json({ message: "Failed to get user!" });
        }
    } catch (error) {
        webhook(`\`\`\`js\n${error}\`\`\``);;
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

exports.messMail = async (req, res, next) => {
    try {
        const userEmails = await User.find({}).select([
            'email'
        ]);
        const { subject, text, html } = req.body;
        if (userEmails) {
            userEmails.forEach(async (user) => {
                mailer({
                    email: user.email,
                    subject,
                    text,
                    html
                })
            }).then(() => {
                return res.status(200).json({
                    success: true,
                    message: "Mail sent successfully!"
                });
            }).catch(err => {
                webhook(`\`\`\`js\n${err}\`\`\``);
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong!",
                    err
                })
            })
        } else {
            return res.status(404).json({ message: "Failed to get user emails!" });
        }
    } catch (error) {
        webhook(`\`\`\`js\n${error}\`\`\``);
        console.log(error);
    }
}

exports.mailUser = async (req, res, next) => {
    try {
        const { email, subject, text, html } = req.body;
        mailer({
            email,
            subject,
            text,
            html
        }).then(() => {
            return res.status(200).json({
                success: true,
                message: "Mail sent successfully!"
            });
        }).catch(err => {
            webhook(`\`\`\`js\n${err}\`\`\``);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!",
                err
            })
        })
    } catch (error) {
        webhook(`\`\`\`js\n${error}\`\`\``);;
        console.log(error);
    }
}