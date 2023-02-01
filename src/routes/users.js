import express from 'express'
import usersController from '../controllers/usersController.js'
/* import jwt from 'jsonwebtoken' */
/* import { verifyToken } from '../server.js' */
const router = express.Router()


/* const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY)
    req.user = payload
    next()
  } catch (error) {
    res.status(401).json({ status: 'failed', message: 'Invalid token' })
  }
}
 */
router.post('/login', usersController.login)

router.post('/register', usersController.register)
/* 
router.get('/secret', verifyToken, usersController.secret); */

export default router
