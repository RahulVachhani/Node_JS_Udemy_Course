import express from 'express'
import authController from '../../controllers/auth/auth.js'
import { check, body } from 'express-validator';


const router = express.Router()

router.get('/login', authController.getLogin)

router.get('/signup', authController.getSignUp)

router.post('/login', authController.postLogin)

router.post('/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter valid email.')
            .custom((value, { req }) => {
                if (value === 'rahul.vachhani@openxcell.com') {
                    throw new Error('This email is not allowed')
                }
                return true
            }),

        body('password')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .withMessage('Password must be at least 6 characters long')
            .trim(),
            
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true;
            })
            .trim()
    ], authController.postSignUp)

router.post('/logout', authController.postLogout)

router.get('/reset', authController.getReset)

router.post('/reset', authController.postReset)

router.get('/reset/:token', authController.getNewPassword)

router.post('/new-password', authController.postNewPassword)

export default router
