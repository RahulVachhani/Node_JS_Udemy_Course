import express from "express"
import adminProduct from "../../controllers/admin/products.js"

const router = express.Router()

router.get('/add-product', adminProduct.addProductPage)

router.post('/add-product', adminProduct.addProduct)

router.get('/show-products', adminProduct.showProduct)

router.get('/edit-product/:productId', adminProduct.editProductPage)

router.post('/edit-product', adminProduct.postEditProduct)

router.post('/delete-product', adminProduct.deleteProduct)

export default router