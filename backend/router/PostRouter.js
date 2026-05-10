const express =require("express")
const router=express.Router()
const upload = require("../middleware/uploadMiddleware")
const { addPost, getPost, delSinglePost, delAllPost } = require("../controller/PostController")


router.get("/",getPost)
router.post("/",upload.single("Image"),addPost)
router.delete("/:id",delSinglePost)
router.delete("/",delAllPost)

module.exports=router
