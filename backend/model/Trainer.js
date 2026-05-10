const mongoose = require("mongoose")

const trainerSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true
    },
    Role: {
      type: String,
      required: true
    },
    Skills: {
      type: [{type:String}],   
      required: true
    },
    Experience: {
      type: Number,
      required: true
    },
    Photo: {
      type: String,
      required: true
    }
  }
)

module.exports = mongoose.model("trainer", trainerSchema);
