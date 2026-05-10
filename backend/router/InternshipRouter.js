const express =require("express")
const router=express.Router()
const upload = require("../middleware/uploadMiddleware")
const { addInternship, getAllInternship, delSingleInternship, delInternship } = require("../controller/InternshipController")



router.post("/",upload.single("Image"),addInternship)
router.get("/",getAllInternship)
router.delete("/:id",delSingleInternship)
router.delete("/",delInternship)
module.exports=router