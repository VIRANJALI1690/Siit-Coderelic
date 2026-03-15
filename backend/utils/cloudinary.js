const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn("WARNING: Cloudinary credentials missing. Uploads will fail.");
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Explicitly set resource_type for videos
        const isVideo = file.mimetype.startsWith('video');
        return {
            folder: 'siit_coderelic',
            resource_type: isVideo ? 'video' : 'image', 
            allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov', 'webm', 'webp'],
        };
    },
});

// IMPROVED: Added file size limits here (1000MB)
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1000 * 1024 * 1024, // 1000MB limit
    }
});

module.exports = { cloudinary, upload };