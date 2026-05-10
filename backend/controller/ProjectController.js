const Project = require("../model/Project");
const cloudinary = require("../middleware/cloudinary");

// ✅ Add Project
const addProject = async (req, res) => {
    try {
        const { Title, Description, Technologies } = req.body;

        // Cloudinary URL
        const Image = req.file ? req.file.path : null;

        const project = new Project({
            Title,
            Description,
            Technologies,
            Image
        });

        await project.save();
        res.send(project);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Get All Projects
const getProject = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.send(projects);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete Single Project (Cloudinary delete)
const delSingleProject = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).send("Project not found");
        }

        // Delete image from Cloudinary
        if (project.Image) {
            const publicId = project.Image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy("ftacademy/" + publicId);
        }

        await Project.findByIdAndDelete(id);

        res.send(project);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete All Projects (Cloudinary delete)
const delProject = async (req, res) => {
    try {
        const projects = await Project.find({});

        for (let project of projects) {
            if (project.Image) {
                const publicId = project.Image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy("ftacademy/" + publicId);
            }
        }

        await Project.deleteMany({});
        res.send(projects);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    addProject,
    getProject,
    delSingleProject,
    delProject
};