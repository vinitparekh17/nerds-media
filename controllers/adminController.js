const { isValidObjectId } = require("mongoose")
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

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && isValidObjectId(id)) {
            const oneUser = await User.findById(id);
            res.status(200).json({
                status: 'success',
                data: oneUser
            })
        }
    } catch (error) {
        // Webhook(error)
        console.log("error");
    }
}

exports.getBlogsById = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && isValidObjectId(id)) {
            const oneBlog = await Blog.findById(id);
            return res.status(200).json({
                status: 'success',
                data: oneBlog
            })
        }
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}
exports.getFilesById = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && isValidObjectId(id)) {
            const oneFile = await Study.findById(id);
            return res.status(200).json({
                status: 'success',
                data: oneFile
            })
        }
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}
exports.getCodesById = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && isValidObjectId(id)) {
            const oneCode = await Code.findById(id);
            return res.status(200).json({
                status: 'success',
                data: oneCode
            })
        }
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}

// delete methods
exports.deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        if (id && isValidObjectId(id)) {
            const deletedUser = await User.findByIdAndDelete(id);
            res.status(200).json({
                status: 'success',
                data: deletedUser
            })
        }
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}

// same for blogs, codes and files
exports.deleteBlog = async (req, res) => {
    try {
        let { id } = req.params;
        if (id && isValidObjectId(id)) {
            const deletedBlog = await Blog.findByIdAndDelete(id);
            res.status(200).json({
                status: 'success',
                data: deletedBlog
            })
        }
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}

exports.deleteCode = async (req, res) => {
    try {
        let { id } = req.params;
        if (id && isValidObjectId(id)) {
            const deletedCode = await Code.findByIdAndDelete(id);
            res.status(200).json({
                status: 'success',
                data: deletedCode
            })
        }
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}

exports.deleteFile = async (req, res) => {
    try {
        let { id } = req.params;
        if (id && isValidObjectId(id)) {
            const deletedFile = await Study.findByIdAndDelete(id);
            res.status(200).json({
                status: 'success',
                data: deletedFile
            })
        }
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}


exports.updateBlog = async (req, res) => {
    try {
        let { id } = req.params;
        let { data } = req.body;
        if (id && isValidObjectId(id)) {
            await Blog.findByIdAndUpdate(id, data)
            res.status(200).json({
                status: 'success'
            })
        }
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}

exports.updateCode = async (req, res) => {
    try {
        let { id } = req.params;
        let newData = req.body;
        if (id && isValidObjectId(id)) {
            let oldData = await Code.findById(id);
            let keys = Object.keys(newData);
            if (newData !== oldData) {
                keys.forEach(key => {
                    if (newData[key] !== oldData[key]) {
                        oldData[key] = newData[key];
                    }
                })
                await oldData.save()
                res.status(200).json({
                    status: 'success'
                })
            }
        }
    } catch (error) {
        // Webhook(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
        console.log(error);
    }
}

exports.updateFile = async (req, res) => {
    try {
        let { id } = req.params;
        let { data } = req.body;
        if (id && isValidObjectId(id)) {
            await Study.findByIdAndUpdate(id, data, { new: true })
            res.status(200).json({
                status: 'success'
            })
        }
    } catch (error) {
        Webhook(error)
        console.log(error);
    }
}