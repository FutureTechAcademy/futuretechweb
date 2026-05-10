const Post = require("../model/Post")
const path = require("path")
const fs = require("fs")

// Add Post
const addPost = async (req, res) => {
    try {
        const { Title, Description } = req.body
        const Image = req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null

        const post = new Post({ Title, Description, Image })
        await post.save()
        res.send(post)
    }
    catch (err) {
        res.send(err.message)
    }
}

// Get Post
const getPost = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 })
        res.send(posts)
    }
    catch (err) {
        res.send(err.message)
    }
}


// del Post
const delSinglePost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findOne({ _id: id })
        if (post.Image) {
            const ImageName = post.Image.split("/images/")[1]
            const ImagePath = path.join(__dirname, "../images", ImageName)
            if (fs.existsSync(ImagePath)) {
                fs.unlinkSync(ImagePath)
            }
        }
        await Post.deleteOne({ _id: id })
        res.send(post)

    }
    catch (err) {
        res.send(err.message)
    }
}

// Add Post
const delAllPost = async (req, res) => {
    try {
        const posts = await Post.find({})
        posts.forEach((post) => {

            if (post.Image) {
                const ImageName = post.Image.split("/images/")[1]
                const ImagePath = path.join(__dirname, "../images", ImageName)
                if (fs.existsSync(ImagePath)) {
                    fs.unlinkSync(ImagePath)
                }
            }
        })

        await Post.deleteMany({})
        res.send(posts)

    }
    catch (err) {
        res.send(err.message)
    }
}


module.exports = { addPost, getPost, delSinglePost ,delAllPost}