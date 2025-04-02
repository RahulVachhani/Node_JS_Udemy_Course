import express from 'express'
import adminProduct from '../../controllers/admin/products.js'
import isAuth from '../../middleware/is-auth.js'

const router = express.Router()

router.get('/add-product', isAuth, adminProduct.addProductPage)

router.post('/add-product', isAuth, adminProduct.addProduct)

router.get('/show-products', isAuth, adminProduct.showProduct)

router.get('/edit-product/:productId', isAuth, adminProduct.editProductPage)

router.post('/edit-product', isAuth, adminProduct.postEditProduct)

router.post('/delete-product', isAuth, adminProduct.deleteProduct)

export default router
