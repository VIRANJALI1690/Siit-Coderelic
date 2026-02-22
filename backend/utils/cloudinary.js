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
    console.warn("WARNING: Cloudinary credentials are missing in .env file. File uploads will likely fail.");
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let resourceType = 'auto'; // Default to auto
        if (file.mimetype.startsWith('video')) {
            resourceType = 'video';
        }

        return {
            folder: 'siit_coderelic',
            resource_type: resourceType,
            allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov', 'webm', 'webp'], // Added webp
            // public_id: file.originalname.split('.')[0], // Optional: keep original name logic
        };
    },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
