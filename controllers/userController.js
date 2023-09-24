const User = require("../models/userModel");
const { isValidObjectId } = require("mongoose");
const Blog = require("../models/blogModel");
const Code = require("../models/codeModel");
const File = require("../models/studyModel");
const mailer = require('../utils/nodeMailer');
const webhook = require("../utils/webhook");
const Webhook = require("../utils/webhook");

// get current user details from database for authentication
exports.signin = async (req, res, next) => {
    try {
        const { email } = req.body
        const existUser = await User.findOne({ email })

        if (existUser) {
            return res.status(200).json({
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
                return res.status(200).json({
                    success: true,
                    message: "User created successfully!",
                    user: newUser
                })
            }
        }

    } catch (error) {
        webhook(`\`\`\`js\n${error}\`\`\``);;
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}


// get all users except current user from database for chat purpose
exports.getAllusers = async (req, res, next) => {
    try {
        let { page } = req.body;
        page = parseInt(page);
        let userList = [];
        let numOfUser = await User.countDocuments();
        numOfUser = Math.ceil(numOfUser);

        // if page is 1 then send 10 users else send 10 users from page * 10
        if (page === 1) {
            userList = await User.find().select(['_id', 'userName', 'profilePic']).limit(10);
        } else {
            userList = await User.find().select(['_id', 'userName', 'profilePic']).skip((page - 1) * 10).limit(10);
        }

        // if user list is not empty then send user list
        if (userList) {
            res.status(200).json({
                success: true,
                message: "Users fetched successfully!",
                userList,
                numOfUser,
                end: page * 10 >= numOfUser ? true : false
            })
        }
    } catch (error) {
        webhook(`\`\`\`js\n${error}\`\`\``);
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

exports.blogUser = async (req, res) => {
    try {
        const blogUserIDs = await Blog.find({}).select(['userId']);
        if (blogUserIDs) {
            let blogUsers = [];
            blogUserIDs.map(async (user, i) => {
                // how to find user by id where i have ids in form new ObjectId("5f9b9b9b9b9b9b9b9b9b9b9b")
                const blogUser = await User.findOne({ _id: user.userId }).select(['_id', 'userName', 'profilePic']);
                blogUsers.push(blogUser);
                if (i === blogUserIDs.length - 1) {
                    return res.json({
                        success: true,
                        message: "Blog users fetched successfully!",
                        blogUsers
                    });
                }
            })
        } else {
            return res.status(404).json({ message: "Failed to get blog users!" });
        }
    } catch (error) {
        webhook(`\`\`\`js\n${error}\`\`\``);
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.id }).select([
            '_id',
            'userName',
            'profilePic',
            'email',
            'role'
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
        return res.status(500).json({
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
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
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
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        // delete user by id and all blogs, codes, files of that user
        const { id } = req.params;
        if(!isValidObjectId(id)) return res.status(404).json({ message: "User not found!" });
        await User.deleteOne({ _id: id });
        await Blog.deleteMany({ userId: id });
        await Code.deleteMany({ userId: id });
        await File.deleteMany({ userId: id });
        return res.json({
            success: true,
            message: "User deleted successfully!"
        });
    } catch (error) {
        Webhook(`\`\`\`js\n${error}\`\`\``);
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}