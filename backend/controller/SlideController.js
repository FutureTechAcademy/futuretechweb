const Slide = require("../model/Slide")
const path = require("path")
const fs = require("fs")
// Add Slide 
const addSlide = async (req, res) => {
    try {
        const { Title, Description } = req.body
        const Image = req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null
        const slide = new Slide({ Title, Description, Image })
        await slide.save()
        res.send(slide)
    }
    catch (err) {
        res.send(err.message)
    }

}

// Get Slide 
const getSlide = async (req, res) => {
    try {
        const slides = await Slide.find({})
        res.send(slides)
    }
    catch (err) {
        res.send(err.message)
    }

}


// Delete Single Slide 
const delSingleSlide = async (req, res) => {
    try {
        const id = req.params.id
        const slide = await Slide.findOne({ _id: id })
        if (slide.Image) {
            const FileName = slide.Image.split("/images/")[1]
            const FilePath = path.join(__dirname, "../images", FileName)
            if (fs.existsSync(FilePath)) {
                fs.unlinkSync(FilePath)
            }
        }
        await Slide.deleteOne({ _id: id })
        res.send(slide)

    }
    catch (err) {
        res.send(err.message)
    }
}


// Delete All Slide 
const delAllSlide = async (req, res) => {
    try {
        const slides = await Slide.find({})
        slides.forEach((slide) => {
            if (slide.Image) {
                const FileName = slide.Image.split("/images/")[1]
                const FilePath = path.join(__dirname, "../images", FileName)
                if (fs.existsSync(FilePath)) {
                    fs.unlinkSync(FilePath)
                }
            }
        })

        await Slide.deleteMany({})
        res.send(slides)

    }
    catch (err) {
        res.send(err.message)
    }
}

module.exports = { addSlide, getSlide, delSingleSlide ,delAllSlide}