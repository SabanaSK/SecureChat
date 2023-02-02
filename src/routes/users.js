import express from 'express'
import usersController from '../controllers/usersController.js'
/* import jwt from 'jsonwebtoken' */
/* import { verifyToken } from '../server.js' */
const router = express.Router()



router.post('/login', usersController.login)

router.post('/register', usersController.register)

router.get('/autologin', usersController.autoLogin);

/* router.get('/secret', verifyToken, usersController.secret) */

export default router
