const path = require("path")
const fs = require("fs")
const Course = require("../model/Course")

//Post Courses
const postCourse = async (req, res) => {
    try {
        const { Title, Description, Category ,Technologies, Duration } = req.body
        const Image = req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null;

        const course = new Course({ Title, Description,Category ,Technologies, Duration, Image })
        await course.save()
        res.send(course)
    }
    catch (err) {
        res.send(err.message)
    }
}

//Get All Courses
const getAllCourse = async (req, res) => {
    try {
        const allData = await Course.find({})
        res.send(allData)
    }
    catch (err) {
        res.send(err.message)
    }
}

//Get Courses By ID
const getCourseById = async (req, res) => {
    try {
        const id = req.params.id
        const allData = await Course.findById({ _id: id })
        res.send(allData)
    }
    catch (err) {
        res.send(err.message)
    }
}

//Get Course List
const getCourseList = async (req, res) => {
    try {
        const allData = await Course.find({}, "Title")
        res.send(allData)
    }
    catch (err) {
        res.send(err.message)
    }
}

//Delete Courses By ID
const delCourseById = async (req, res) => {
    try {

        const id = req.params.id;
        const course = await Course.findById({ _id: id });

        if (!course) {
            return res.send({ message: "Course not found" });
        }

        if (course.Image) {
            const imageName = course.Image.split("/images/")[1];
            const imagePath = path.join(__dirname, "../images", imageName);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await Course.deleteOne({ _id: id });
        res.send(course)
    }
    catch (err) {
        res.send(err.message)
    }
}

//Delete All Course 
const delAllCourse = async (req, res) => {
    try {
        const course = await Course.find({})
        await Course.deleteMany({})

        course.forEach((cou) => {
            if (cou.Image) {
                const imageName = cou.Image.split("/images/")[1];
                const imagePath = path.join(__dirname, "../images", imageName);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        })
        res.send(course)
    }
    catch (err) {
        res.send(err.message)
    }
}



module.exports = { postCourse, getAllCourse, getCourseById, getCourseList, delCourseById, delAllCourse }