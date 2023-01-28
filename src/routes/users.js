import express from 'express'
import db from '../../config/database.js'
const router = express.Router()

//GET users name and password
router.get('/', (req, res) => {
  // const users = db.data.users;
  console.log('users')
  res.status(200).send('users')

})


export default router
