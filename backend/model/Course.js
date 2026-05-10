const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
    {
        Title:
        {
            type: String,
            required: true
        },
        Description:
        {
            type: String,
            required: true
        },
        Category:
        {
            type: String,
            required: true
        },
        Technologies: [
            { type: String }
        ],
        Duration:
        {
            type:String,
            required: true
        },
        Image:
        {
            type:String,
            required: true
        }

    }
)

module.exports = mongoose.model("course",courseSchema)