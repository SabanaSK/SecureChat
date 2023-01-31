import express from 'express'
import usersController from '../controllers/usersController.js'

const router = express.Router()


router.post('/login', usersController.login)

router.post('/register', usersController.register)


export default router
