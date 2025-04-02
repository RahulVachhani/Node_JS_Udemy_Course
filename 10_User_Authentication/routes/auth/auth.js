import express from 'express'
import authController from '../../controllers/auth/auth.js'

const router = express.Router()

router.get('/login', authController.getLogin)

router.get('/signup', authController.getSignUp)

router.post('/login', authController.postLogin)

router.post('/signup', authController.postSignUp)

router.post('/logout', authController.postLogout)

export default router