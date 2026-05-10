const Internship = require("../model/Internship");
const cloudinary = require("../middleware/cloudinary");

// ✅ Add Internship
const addInternship = async (req, res) => {
    try {
        const { Title, Description, Technologies, Duration } = req.body;

        // Cloudinary URL
        const Image = req.file ? req.file.path : null;

        const internship = new Internship({
            Title,
            Description,
            Technologies,
            Duration,
            Image
        });

        await internship.save();
        res.send(internship);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Get All Internship
const getAllInternship = async (req, res) => {
    try {
        const internships = await Internship.find({});
        res.send(internships);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete Single Internship (Cloudinary delete)
const delSingleInternship = async (req, res) => {
    try {
        const id = req.params.id;
        const intern = await Internship.findById(id);

        if (!intern) {
            return res.status(404).send("Internship not found");
        }

        // Delete image from Cloudinary
        if (intern.Image) {
            const publicId = intern.Image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy("ftacademy/" + publicId);
        }

        await Internship.findByIdAndDelete(id);

        res.send(intern);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete All Internship (Cloudinary delete)
const delInternship = async (req, res) => {
    try {
        const interns = await Internship.find({});

        for (let intern of interns) {
            if (intern.Image) {
                const publicId = intern.Image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy("ftacademy/" + publicId);
            }
        }

        await Internship.deleteMany({});
        res.send(interns);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    addInternship,
    getAllInternship,
    delSingleInternship,
    delInternship
};