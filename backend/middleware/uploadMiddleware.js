const multer = require("multer");
const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ftacademy",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        public_id: (req, file) => {
            return Date.now() + "-" + file.originalname;
        }
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 20 }
});

module.exports = upload;