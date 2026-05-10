const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dszwv1yzu",
    api_key: "487785693253229",
    api_secret: "7bzoi9myOygDEaf4Vhmvrkmbx-w"
});

module.exports = cloudinary;