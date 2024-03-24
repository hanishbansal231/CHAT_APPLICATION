import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { config } from 'dotenv';
config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


/**
 * file upload in cloudinary
 * @param {*} localFile 
 * @returns 
 */
export const fileUploader = async (localFile) => {
    try {
        console.log(localFile);
        if (!localFile) return null;

        const file = await cloudinary.uploader.upload(localFile, {
            folder: 'chat',
            resource_type: 'auto'
        });

        fs.unlinkSync(localFile);
        return file;

    } catch (error) {
        fs.unlinkSync(localPath);
        return null;
    }
}

/**
 * 
 * @param {*} publicId 
 * destroy old image cloudinary 
 */
export const fileDestroy = async (publicId) => {
    try {
        if(!publicId) return;
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        return;
    }
}
