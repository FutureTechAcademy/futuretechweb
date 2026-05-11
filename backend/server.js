const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
require("dotenv").config()
const courseRouter = require("./router/CourseRouter")
const projectRouter = require("./router/ProjectRouter")
const trainerRouter = require("./router/TrainerRouter")
const userRouter = require("./router/UserRouter")
const postRouter = require("./router/PostRouter")
const slideRouter = require("./router/SlideRouter")
const adminRouter = require("./router/AdminRouter")
const internshipRouter = require("./router/InternshipRouter")
const app = express()




// const dns = require('dns');
// dns.setDefaultResultOrder('ipv4first');
// dns.setServers(["1.1.1.1","8.8.8.8"])

// Variable 
const PORT = process.env.PORT
const DB_PATH = process.env.MONGO_URL


mongoose.connect(DB_PATH)
    .then(() => {
        console.log("Database Connected")
        app.listen(PORT, () => {
            console.log(`Server Started Port Number ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err.message)
    })

// Add Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Add Static Files
app.get("/admin-panel", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "admin.html"));
});
app.use("/", express.static(path.join(__dirname, "frontend")))


// app.use("/images",express.static(path.join(__dirname,"images")))
app.use("/user", userRouter)
app.use("/course", courseRouter)
app.use("/trainer", trainerRouter)
app.use("/project", projectRouter)
app.use("/post", postRouter)
app.use("/slide", slideRouter)
app.use("/admin", adminRouter)
app.use("/internship", internshipRouter)

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong on the server!",
        error: err.message
    });
});

