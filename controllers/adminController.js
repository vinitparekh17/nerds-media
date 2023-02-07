const User = require('../models/userModel');
const Blog = require('../models/blogModel');
const Code = require('../models/codeModel');
const Study = require('../models/studyModel');
const Webhook = require('../utils/webhook')

exports.getUsers = async (req, res) => {
    try {
        const Users = await User.find();
        res.status(200).json({
            status: 'success',
            results: Users.length,
            data: Users
        })
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}

exports.getBlogs = async (req, res) => {
    try {
        const Blogs = await Blog.find();
        res.status(200).json({
            status: 'success',
            results: Blogs.length,
            data: Blogs
        })
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}

exports.getCodes = async (req, res) => {
    try {
        const Codes = await Code.find();
        res.status(200).json({
            status: 'success',
            results: Codes.length,
            data: Codes
        })
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}

exports.getFiles = async (req, res) => {
    try {
        const Files = await Study.find();
        res.status(200).json({
            status: 'success',
            results: Files.length,
            data: Files
        })
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}