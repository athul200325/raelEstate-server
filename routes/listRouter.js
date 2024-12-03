import express from 'express'
import { addListController, deleteListController, getAllListsController, getSingleListController, getUserListsController, updateListController } from '../controllers/listingController.js'
import jwtMiddleware from '../middleware/jwtMiidleware.js'
import multerMiddleware from '../middleware/multerMiddleware.js'

const router = express.Router()

router.post('/createlist',jwtMiddleware,multerMiddleware.single('houselmage'), addListController)

router.get('/homelists',getAllListsController)

router.get('/userlists',jwtMiddleware,getUserListsController)

router.put('/lists/:id/edit',jwtMiddleware,multerMiddleware.single('houseImage'),updateListController)

router.delete('/lists/:id/delete',jwtMiddleware,deleteListController)

router.get('/houselists/:id',jwtMiddleware,getSingleListController)



export default router