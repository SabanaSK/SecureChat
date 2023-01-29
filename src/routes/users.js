import express from 'express'
import db from '../../config/database.js'
import login from '../controllers/usersController.js'

const router = express.Router()


router.get('/', login)


export default router
