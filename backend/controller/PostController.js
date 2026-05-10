const Post = require("../model/Post");
const cloudinary = require("../middleware/cloudinary");

// ✅ Add Post
const addPost = async (req, res) => {
    try {
        const { Title, Description } = req.body;

        // Cloudinary URL
        const Image = req.file ? req.file.path : null;

        const post = new Post({ Title, Description, Image });
        await post.save();

        res.send(post);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Get Post
const getPost = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.send(posts);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete Single Post (Cloudinary delete)
const delSinglePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send("Post not found");
        }

        // Delete image from Cloudinary
        if (post.Image) {
            const publicId = post.Image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy("ftacademy/" + publicId);
        }

        await Post.findByIdAndDelete(id);

        res.send(post);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete All Posts (Cloudinary delete)
const delAllPost = async (req, res) => {
    try {
        const posts = await Post.find({});

        for (let post of posts) {
            if (post.Image) {
                const publicId = post.Image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy("ftacademy/" + publicId);
            }
        }

        await Post.deleteMany({});

        res.send(posts);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { addPost, getPost, delSinglePost, delAllPost };