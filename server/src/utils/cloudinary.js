import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const upload = async (fileuploadpath) => {
    try {
        if(!fileuploadpath) return null;
        
        const result = await cloudinary.uploader.upload(fileuploadpath, {
            resource_type: "auto",
        });
        fs.unlinkSync(fileuploadpath);
        return result;
    }
    catch (error) {
        fs.unlinkSync(fileuploadpath);
        return null;
    }
}

