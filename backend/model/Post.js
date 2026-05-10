const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
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
        Image:
        {
            type:String,
            required:true
        }
    },
    {timestamps:true}
)


module.exports=mongoose.model("post",postSchema)