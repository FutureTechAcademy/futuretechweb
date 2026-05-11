const express = require("express");
const router = express.Router();
// Ensure this path matches where you saved the Multer config we just corrected
const upload = require("../middleware/uploadMiddleware"); 
const { 
    addSlide, 
    getSlide, 
    delSingleSlide, 
    delAllSlide 
} = require("../controller/SlideController");

/**
 * @route   POST /slide
 * @desc    Add a new slide with an image
 * @access  Public (or Admin)
 */
// The string "Image" must match exactly what your frontend sends in FormData
router.post("/", upload.single("Image"), addSlide);

/**
 * @route   GET /slide
 * @desc    Get all slides
 */
router.get("/", getSlide);

/**
 * @route   DELETE /slide/:id
 * @desc    Delete a specific slide and its Cloudinary image
 */
router.delete("/:id", delSingleSlide);

/**
 * @route   DELETE /slide
 * @desc    Delete all slides and clear Cloudinary folder
 */
router.delete("/", delAllSlide);

module.exports = router;