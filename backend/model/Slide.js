const mongoose =  require("mongoose")

const slideSchema = new mongoose.Schema(
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
    }
)

module.exports=mongoose.model("slide",slideSchema)