const Slide = require("../model/Slide");
const cloudinary = require("../middleware/cloudinary");

// ✅ Add Slide
const addSlide = async (req, res) => {
    try {
        const { Title, Description } = req.body;

        // If Multer fails or no file is attached, req.file will be undefined
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const Image = req.file.path; // This is the Cloudinary URL

        const slide = new Slide({ Title, Description, Image });
        await slide.save();

        res.status(201).json(slide);

    } catch (err) {
        console.error("Add Slide Error:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// ✅ Get Slides
const getSlide = async (req, res) => {
    try {
        const slides = await Slide.find({}).sort({ createdAt: -1 });
        res.status(200).json(slides);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Helper to safely extract Cloudinary Public ID
 * Handles both root and folder-based paths
 */
const getCloudinaryId = (url) => {
    if (!url) return null;
    try {
        const parts = url.split('/');
        const fileName = parts[parts.length - 1]; // gets "imagename.jpg"
        return fileName.split('.')[0]; // gets "imagename"
    } catch (error) {
        return null;
    }
};

// ✅ Delete Single Slide
const delSingleSlide = async (req, res) => {
    try {
        const id = req.params.id;
        const slide = await Slide.findById(id);

        if (!slide) {
            return res.status(404).json({ message: "Slide not found" });
        }

        // Delete from Cloudinary
        if (slide.Image) {
            const publicId = getCloudinaryId(slide.Image);
            if (publicId) {
                // Ensure "ftacademy/" matches your folder name in Multer config
                await cloudinary.uploader.destroy(`ftacademy/${publicId}`);
            }
        }

        await Slide.findByIdAndDelete(id);
        res.status(200).json({ message: "Slide deleted successfully" });

    } catch (err) {
        console.error("Delete Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

// ✅ Delete All Slides
const delAllSlide = async (req, res) => {
    try {
        const slides = await Slide.find({});

        // Use Promise.all for faster deletion on Render
        const deletePromises = slides.map(async (slide) => {
            if (slide.Image) {
                const publicId = getCloudinaryId(slide.Image);
                if (publicId) {
                    return cloudinary.uploader.destroy(`ftacademy/${publicId}`);
                }
            }
        });

        await Promise.all(deletePromises);
        await Slide.deleteMany({});

        res.status(200).json({ message: "All slides deleted" });

    } catch (err) {
        console.error("Delete All Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addSlide,
    getSlide,
    delSingleSlide,
    delAllSlide
};