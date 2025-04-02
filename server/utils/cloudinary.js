const cloudinary = require("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const multer = require("multer")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const allowedFormats = ["jpeg", "png", "jpg", "webp"];
        const fileFormat = file.mimetype.split("/")[1];

        if (!allowedFormats.includes(fileFormat)) {
            throw new Error("Unsupported file format!");
        }

        return {
            folder: "online-shopping",
            format: fileFormat,
            public_id: file.originalname.split(".")[0],
        };
    },
});



//const parser = multer({storage: storage})
const parser = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("File received:", file);
        cb(null, true);
    }
});


module.exports = {
    cloudinary,
    parser
}