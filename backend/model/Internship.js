const mongoose = require("mongoose")

const internshipSchema = new mongoose.Schema(
    {
        Title:
        {
            type:String,
            required:true
        },
        Description:
        {
           type:String,
           required:true  
        },
        Technologies:[{type:String,required:true}],
        Duration:{
            type:String,
            required:true
        },
        Image:{
            type:String,
            required:true
        }
        
    }
)

module.exports=mongoose.model("internship",internshipSchema)