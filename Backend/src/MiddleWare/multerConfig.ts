import multer from 'multer';
import path from 'path';

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req:any, file:Express.Multer.File, cb:any) => {
        cb(null, './src/Storage'); // Specify the directory to save uploaded files
    },
    filename: (req:any, file:Express.Multer.File, cb:any) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Generate a unique filename
    }
});

export {multer,storage};
