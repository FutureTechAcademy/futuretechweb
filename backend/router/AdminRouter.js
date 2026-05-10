const express=require("express")
const router = express.Router()
const {adminLogin} =require("../controller/AdminController")


router.post("/",adminLogin)


module.exports=router