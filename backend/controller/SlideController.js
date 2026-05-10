const Slide = require("../model/Slide");
const cloudinary = require("../middleware/cloudinary");

// ✅ Add Slide
const addSlide = async (req, res) => {
    try {
        const { Title, Description } = req.body;

        // Cloudinary URL
        const Image = req.file ? req.file.path : null;

        const slide = new Slide({ Title, Description, Image });
        await slide.save();

        res.send(slide);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Get Slides
const getSlide = async (req, res) => {
    try {
        const slides = await Slide.find({});
        res.send(slides);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete Single Slide (Cloudinary delete)
const delSingleSlide = async (req, res) => {
    try {
        const id = req.params.id;
        const slide = await Slide.findById(id);

        if (!slide) {
            return res.status(404).send("Slide not found");
        }

        // Delete image from Cloudinary
        if (slide.Image) {
            const publicId = slide.Image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy("ftacademy/" + publicId);
        }

        await Slide.findByIdAndDelete(id);

        res.send(slide);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete All Slides (Cloudinary delete)
const delAllSlide = async (req, res) => {
    try {
        const slides = await Slide.find({});

        for (let slide of slides) {
            if (slide.Image) {
                const publicId = slide.Image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy("ftacademy/" + publicId);
            }
        }

        await Slide.deleteMany({});
        res.send(slides);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    addSlide,
    getSlide,
    delSingleSlide,
    delAllSlide
};