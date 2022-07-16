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
    const {blogId, blogUserId, currentUserId  } = req.body;
    try {
        if (blogUserId === currentUserId) {
            const data = await Blog.deleteOne({ _id: blogId });
            if (data) {
                return res.status(200).json({ message: "Blog deleted successfully." });
            } else {
                return res.status(404).json({ message: "Failed to delete blog from the database" });
            }
        }
    } catch (ex) {
        console.error(ex);
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