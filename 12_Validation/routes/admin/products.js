import express from 'express'
import adminProduct from '../../controllers/admin/products.js'
import isAuth from '../../middleware/is-auth.js'
import { body } from 'express-validator'

const router = express.Router()

router.get('/add-product', isAuth, adminProduct.addProductPage)

router.post('/add-product', isAuth,
    [
        body('title')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Title is required and cannot be empty'),
        body('imageUrl')
            .isString()
            .withMessage('image url is required valid ulr'),
        body('price')
            .isFloat()
            .withMessage('price is required valid only float'),
        body('description')
            .isLength({ min: 5 })
            .trim()
            .withMessage('description is required valid with 5 length'),
    ],
    adminProduct.addProduct)

router.get('/show-products', isAuth, adminProduct.showProduct)

router.get('/edit-product/:productId', isAuth, adminProduct.editProductPage)

router.post('/edit-product', isAuth,
    [
        body('title')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Title is required and cannot be empty'),
        body('imageUrl')
            .isString()
            .withMessage('image url is required valid ulr'),
        body('price')
            .isFloat(),
        body('description')
            .isLength({ min: 5 })
            .trim()
            .withMessage('description is required valid with 5 length'),
    ], adminProduct.postEditProduct)

router.post('/delete-product', isAuth, adminProduct.deleteProduct)

export default router
