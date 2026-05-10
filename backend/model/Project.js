const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema(
    {
        Title: {
            type: String,
            required: true
        },
        Description:
        {
            type: String,
            required: true
        },
        Technologies:
        {
            type: [{ type: String }],
            required: true
        },
        Image:
        {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("project", projectSchema)
