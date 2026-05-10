const Course = require("../model/Course");
const cloudinary = require("../middleware/cloudinary");

// ✅ Post Course
const postCourse = async (req, res) => {
    try {
        const { Title, Description, Category, Technologies, Duration } = req.body;

        // Cloudinary Image URL
        const Image = req.file ? req.file.path : null;

        const course = new Course({
            Title,
            Description,
            Category,
            Technologies,
            Duration,
            Image
        });

        await course.save();
        res.send(course);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Get All Courses
const getAllCourse = async (req, res) => {
    try {
        const allData = await Course.find({});
        res.send(allData);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Get Course By ID
const getCourseById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Course.findById(id);
        res.send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Get Course List (Only Title)
const getCourseList = async (req, res) => {
    try {
        const allData = await Course.find({}, "Title");
        res.send(allData);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete Course By ID (Cloudinary delete)
const delCourseById = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).send("Course not found");
        }

        // Delete image from Cloudinary
        if (course.Image) {
            const publicId = course.Image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy("ftacademy/" + publicId);
        }

        await Course.findByIdAndDelete(id);

        res.send(course);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Delete All Courses (Cloudinary delete)
const delAllCourse = async (req, res) => {
    try {
        const courses = await Course.find({});

        for (let course of courses) {
            if (course.Image) {
                const publicId = course.Image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy("ftacademy/" + publicId);
            }
        }

        await Course.deleteMany({});
        res.send(courses);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    postCourse,
    getAllCourse,
    getCourseById,
    getCourseList,
    delCourseById,
    delAllCourse
};