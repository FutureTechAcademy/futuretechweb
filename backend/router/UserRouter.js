const express=require("express")
const router=express.Router()
const {postUser,getUser,delUser} = require("../controller/UserController")
const authMiddleware= require("../middleware/authMiddleware")

router.post("/",postUser)
router.get("/",authMiddleware,getUser)
router.delete("/",authMiddleware,delUser)

module.exports=router