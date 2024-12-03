import express from 'express'
// import { updateUser } from '../controllers/userController.js'
// import verifyToken from '../middleware/verifyToken.js'
import jwtMiddleware from '../middleware/jwtMiidleware.js'
import multerMiddleware from '../middleware/multerMiddleware.js'
import { updateUserController } from '../controllers/authController.js'


const router=express.Router()


// router.post('/profile',verifyToken,updateUser)
router.put('/edit-user',jwtMiddleware,multerMiddleware.single('avatar'),updateUserController)





export default router