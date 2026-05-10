const Internship = require("../model/Internship")
const path = require("path")
const fs = require("fs")
// Add Internship
const addInternship = async (req, res) => {
    try {
        const { Title, Description, Technologies, Duration } = req.body
        const Image = req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null;
        const internship = new Internship({ Title, Description, Technologies, Duration, Image })
        await internship.save()
        res.send(internship)
    }
    catch (err) {
        res.send(err.message)
    }
}

// get All Internship
const getAllInternship = async (req, res) => {
    try {
        const internship = await Internship.find({})
        res.send(internship)
    }
    catch (err) {
        res.send(err.message)
    }
}


// Delete Single Internship
const delSingleInternship = async (req, res) => {
    try {
        const id = req.params.id;
        const intern = await Internship.findById({ _id: id });

        if (!intern) {
            return res.send({ message: "Course not found" });
        }

        if (intern.Image) {
            const imageName = intern.Image.split("/images/")[1];

            const imagePath = path.join(__dirname, "../images", imageName);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await Internship.deleteOne({ _id: id });
        res.send(intern)
    }
    catch (err) {
        res.send(err.message)
    }
}

// Delete All Internship
const delInternship = async (req, res) => {
    try {
        const interns = await Internship.find({})
        for (let intern of interns) {
            if (!intern) {
                return res.send({ message: "Course not found" });
            }

            if (intern.Image) {
                const imageName = intern.Image.split("/images/")[1];

                const imagePath = path.join(__dirname, "../images", imageName);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        }
        await Internship.deleteMany({})
        res.send(interns)
    }
    catch (err) {
        res.send(err.message)
    }
}

module.exports = { addInternship, getAllInternship, delSingleInternship, delInternship }