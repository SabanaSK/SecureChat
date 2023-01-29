import express from 'express'
import getChannels from '../controllers/channelController.js'

const router = express.Router()

router.get('/', getChannels)

export default router