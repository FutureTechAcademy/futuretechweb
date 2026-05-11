const cloudinary = require("cloudinary").v2;

// It is a good practice to ensure variables exist before configuring
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_CLOUD_KEY || !process.env.CLOUDINARY_CLOUD_SECRET) {
    console.error("❌ Cloudinary Error: Missing Environment Variables");
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
    secure: true // Recommended: ensures you use HTTPS for image URLs
});

module.exports = cloudinary;