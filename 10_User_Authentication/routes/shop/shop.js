import express from "express";
import shop from "../../controllers/shop/product.js";
import cart from "../../controllers/shop/cart.js";
import isAuth from "../../middleware/is-auth.js";

const router = express.Router()

router.get('/', shop.showAllProduct)

router.get('/cart', isAuth, cart.showCart)

router.post('/cart', isAuth, cart.AddToCart)

router.post('/delete-cart', isAuth, cart.deleteCartItem)

router.get('/orders', isAuth, shop.showOrders)

router.post('/create-order', isAuth, shop.createOrder)

router.get('/product/:productId', shop.getProduct)

export default router