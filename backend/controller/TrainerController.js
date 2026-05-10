const Trainer = require("../model/Trainer");
const cloudinary = require("../middleware/cloudinary");

// ✅ Add Trainer
const addTrainer = async (req, res) => {
    try {
        const { Name, Role, Skills, Experience } = req.body;

        // Cloudinary URL
        const Photo = req.file ? req.file.path : null;

        const trainer = new Trainer({
            Name,
            Role,
            Skills,
            Experience,
            Photo
        });

        await trainer.save();
        res.send(trainer);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Get Trainers
const getTrainer = async (req, res) => {
    try {
        const trainers = await Trainer.find({});
        res.send(trainers);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete Single Trainer (Cloudinary delete)
const delSingleTrainer = async (req, res) => {
    try {
        const id = req.params.id;
        const trainer = await Trainer.findById(id);

        if (!trainer) {
            return res.status(404).send("Trainer not found");
        }

        // Delete image from Cloudinary
        if (trainer.Photo) {
            const publicId = trainer.Photo.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy("ftacademy/" + publicId);
        }

        await Trainer.findByIdAndDelete(id);

        res.send(trainer);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete All Trainers (Cloudinary delete)
const delAllTrainer = async (req, res) => {
    try {
        const trainers = await Trainer.find({});

        for (let trainer of trainers) {
            if (trainer.Photo) {
                const publicId = trainer.Photo.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy("ftacademy/" + publicId);
            }
        }

        await Trainer.deleteMany({});
        res.send(trainers);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    addTrainer,
    getTrainer,
    delSingleTrainer,
    delAllTrainer
};