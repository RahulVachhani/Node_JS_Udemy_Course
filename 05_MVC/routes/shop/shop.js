import express from "express";
import shop from "../../controllers/shop/product.js";
import cart from "../../controllers/shop/cart.js";

const router = express.Router()

router.get('/', shop.showAllProduct)

router.get('/cart', cart.showCart)

router.post('/cart', cart.AddToCart)

router.post('/delete-cart', cart.deleteCartItem)

router.get('/orders', shop.showOrders)

router.get('/product/:productId', shop.getProduct)

export default router