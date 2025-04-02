import Product from "../../models/product.js"

export const showCart = (req, res, next) => {
   
    req.user
    .populate('cart.items.productId')
        .then(user => {
            // console.log(user.cart.items)
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                cart: user.cart.items,
            })
        })
}

export const AddToCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart')
        })
}

export const deleteCartItem = async (req, res, next) => {
    const prodId = req.body.productId

    req.user.deleteById(prodId)
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log('Error in delete cart items', err))
}

export default { showCart, AddToCart, deleteCartItem }