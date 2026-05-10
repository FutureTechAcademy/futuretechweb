const express=require("express")
const router = express.Router()
const upload = require("../middleware/uploadMiddleware")
const {addSlide, getSlide, delSingleSlide,delAllSlide} =require("../controller/SlideController")


router.post("/",upload.single("Image"),addSlide)

router.get("/",getSlide)

router.delete("/:id",delSingleSlide)
router.delete("/",delAllSlide)
module.exports=router