const Blog = require('../models/blogModel');

exports.addBlog = async (req, res, next) => {
    const { title, content, userId, image } = req.body;
    const blog = new Blog({
        title,
        content,
        userId,
        image
    });
    try {
        const data = await blog.save();
        if (data) {
            return res.json({
                success: true,
                message: "Blog added successfully."
            });
        } else {
            return res.json({ message: "Failed to add blog to the database" });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteBlog = async (req, res, next) => {
    try {
        const data = await Blog.deleteOne({ _id: req.body.id });
        if (data) {
            return res.status(200).json({
                success: true,
                message: "Blog deleted successfully."
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Failed to delete blog from the database"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete blog from the database"
        });
        console.log(error);
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
        console.log(ex);
    }
}

exports.getBlogById = async (req, res, next) => {
    try {
        const data = await Blog.findById(req.query.id);
        if (data) {
            return res.status(200).json({
                success: true,
                data: {
                    title: data.title,
                    content: data.content,
                    userId: data.userId,
                    image: data.image,
                    createdAt: new Date(data.createdAt).toLocaleDateString(),
                }

            });
        } else {
            return res.status(404).json({ message: "Failed to get blog from the database" });
        }
    } catch (ex) {
        console.log(ex);
    }
}