import multer from "multer";

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,`image-${Date.now()}-${file.originalname}`)
    }
})

const multerMiddleware=multer({storage})

export default multerMiddleware;