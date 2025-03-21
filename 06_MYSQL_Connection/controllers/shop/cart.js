import Cart from "../../models/cart.js"
import Product from "../../models/product.js"

export const showCart = (req, res, next) => {
    Cart.fetchAllItems(cart => {
        res.render('shop/cart', {
            pageTitle: 'Cart',
            path: '/cart',
            cart: cart
        })
    })
    
}

export const AddToCart = (req, res, next) => {
    const prodId = req.body.productId
    console.log(prodId);
    Product.findById(prodId, (product) => {
        Cart.addToCart(prodId, product.price)
    })
    
    res.redirect('/')    
}

export const deleteCartItem = async (req, res, next) => {
    const prodId = req.body.productId
    Cart.delete1(prodId)
    res.redirect('/cart')    
}

export default {showCart, AddToCart, deleteCartItem}