import express from 'express'
import login from '../controllers/usersController.js'

const router = express.Router()


router.post('/', login)


export default router
