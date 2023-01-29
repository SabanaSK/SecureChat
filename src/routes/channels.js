import express from 'express'
import db from '../../config/database.js'
const router = express.Router()

//GET users name and password
router.get('/', (req, res) => {
  const channels = db.data.channels;
  res.status(200).send({ channels: channels })

})


export default router