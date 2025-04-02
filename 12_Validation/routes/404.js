import express from 'express'
import { notFoundPage,errorPage } from '../controllers/404.js'

const router = express.Router()

router.get('/500',errorPage)

router.use(notFoundPage)

export default router
