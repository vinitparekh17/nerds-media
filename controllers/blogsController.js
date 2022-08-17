const Blog = require('../models/blogModel');
const webhook = require('../utils/webhook');

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
        webhook(`\`\`\`js\n${error}\`\`\``);;
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
        webhook(`\`\`\`js\n${error}\`\`\``);;
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
    } catch (error) {
        webhook(`\`\`\`js\n${error}\`\`\``);;
        console.log(error);
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
    } catch (error) {
        console.log(error);
        webhook(`\`\`\`js\n${error}\`\`\``);;
    }
}

exports.reportBlog = async (req, res, next) => {
    try {
        const data = await Blog.findByIdAndUpdate(req.body.id, { reported: true });
        if (data) {
            return res.status(200).json({
                success: true,
                message: "Blog reported successfully."
            });
        } else {
            return res.status(404).json({ message: "Failed to report blog from the database" });
        }
    } catch (error) {
        console.log(error);
        webhook(`\`\`\`js\n${error}\`\`\``);
    }
}

exports.updateBlog = async (req, res, next) => {
    try {
        const { title, content, image } = req.body;
        const data = await Blog.findByIdAndUpdate(req.body.id, { title, content, image });
        if (data) {
            return res.status(200).json({
                success: true,
                message: "Blog updated successfully."
            });
        } else {
            return res.status(404).json({ message: "Failed to update blog from the database" });
        }
    } catch (error) {
        console.log(error);
        webhook(`\`\`\`js\n${error}\`\`\``);
    }
}