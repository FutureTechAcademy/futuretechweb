const express=require("express")
const router = express.Router()
const {addProject,getProject, delSingleProject, delProject} = require("../controller/ProjectController")
const upload = require("../middleware/uploadMiddleware")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/",authMiddleware,upload.single("Image"),addProject)
router.get("/",getProject)
router.delete("/",authMiddleware,delProject)
router.delete("/:id",authMiddleware,delSingleProject)
module.exports=router