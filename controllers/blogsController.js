const Blog = require('../models/blogModel');

exports.addBlog = async (req, res, next) => {
    const { title, content, userId } = req.body;
    const blog = new Blog({
        title,
        content,
        userId
    });
    try {
        const data = await blog.save();
        if (data) {
            return res.json({ message: "Blog added successfully." });
        } else {
            return res.json({ message: "Failed to add blog to the database" });
        }
    } catch (ex) {
        next(ex);
    }
}

exports.deleteBlog = async (req, res, next) => {
    const { id } = req.body;
    try {
        const data = await Blog.deleteOne({ _id: id });
        if (data) {
            return res.json({ message: "Blog deleted successfully." });
        } else {
            return res.json({ message: "Failed to delete blog from the database" });
        }
    } catch (ex) {
        next(ex);
    }
}

exports.showBlogs = async (req, res, next) => {
    try {
        const data = await Blog.find({});
        if (data) {
            return res.json({ success: true, data });
        } else {
            return res.json({ message: "Failed to get blogs from the database" });
        }
    } catch (ex) {
        next(ex);
    }
}