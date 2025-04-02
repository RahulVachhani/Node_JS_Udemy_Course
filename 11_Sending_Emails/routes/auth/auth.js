import express from 'express'
import authController from '../../controllers/auth/auth.js'

const router = express.Router()

router.get('/login', authController.getLogin)

router.get('/signup', authController.getSignUp)

router.post('/login', authController.postLogin)

router.post('/signup', authController.postSignUp)

router.post('/logout', authController.postLogout)

router.get('/reset', authController.getReset)

router.post('/reset', authController.postReset)

router.get('/reset/:token', authController.getNewPassword)

router.post('/new-password', authController.postNewPassword)

export default router
