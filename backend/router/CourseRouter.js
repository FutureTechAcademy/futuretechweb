const express=require("express")
const router=express.Router()
const {getAllCourse, postCourse, getCourseById, getCourseList, delCourseById, delAllCourse} = require("../controller/CourseController")
const upload = require("../middleware/uploadMiddleware")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/",authMiddleware,upload.single("Image"),postCourse)

router.get("/",getAllCourse)
router.get("/list",getCourseList)
router.get("/:id",getCourseById)

router.delete("/",authMiddleware,delAllCourse)
router.delete("/:id",authMiddleware,delCourseById)


module.exports=router