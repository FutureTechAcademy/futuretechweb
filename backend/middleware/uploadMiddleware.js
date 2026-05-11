const multer = require("multer");
const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Remove the file extension from the original name to avoid double extensions
        const fileName = file.originalname.split('.')[0].replace(/\s+/g, '-');
        
        return {
            folder: "ftacademy",
            allowed_formats: ["jpg", "png", "jpeg", "webp"],
            // Generates a clean, unique ID without the extension
            public_id: `${Date.now()}-${fileName}`, 
            transformation: [{ width: 1000, crop: "limit" }] // Optional: prevents massive files
        };
    }
});

const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 1024 * 1024 * 10 // 10MB is usually plenty; 20MB can be heavy for Render's RAM
    }
});

module.exports = upload;