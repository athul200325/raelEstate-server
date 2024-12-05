import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Set the upload directory
    },
    filename: (req, file, cb) => {
        // Replace spaces in the filename and remove space between "image" and timestamp
        const sanitizedFilename = file.originalname.replace(/\s+/g, '-');
        cb(null, `image-${Date.now()}-${sanitizedFilename}`);
    }
});

const multerMiddleware=multer({storage})

export default multerMiddleware;