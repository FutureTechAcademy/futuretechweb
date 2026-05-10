const express=require("express")
const router=express.Router()
const {addTrainer, getTrainer, delSingleTrainer, delAllTrainer} = require("../controller/TrainerController")
const upload = require("../middleware/uploadMiddleware")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/",authMiddleware,upload.single("Photo"),addTrainer)
router.get("/",getTrainer)
router.delete("/:id",authMiddleware,delSingleTrainer)
router.delete("/",authMiddleware,delAllTrainer)


module.exports=router