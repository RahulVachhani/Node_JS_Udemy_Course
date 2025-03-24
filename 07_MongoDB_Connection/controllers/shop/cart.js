import Product from "../../models/product.js"

export const showCart = (req, res, next) => {
    
    req.user.getCart({include: ['product1s']} )
        .then(cart => {
            console.log(cart)

            res.render('shop/cart', {
            pageTitle: 'Cart',
            path: '/cart',
            cart: cart
        })
    })
}

export const AddToCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId)
        .then(product => {
            console.log(req.user)
            return req.user.addToCart(product)
        })
        .then(result => {
            console.log(result);
            
        })
    // let fetchedCart;
    // let newQuantity = 1
    // req.user.getCart()
    //     .then(cart => {
    //         fetchedCart = cart
    //         return cart.getProduct1s({ where: { id: prodId } })
    //     })
    //     .then(products => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0]
    //         }

    //         if (product) {
    //             const oldQuantity = product.cartItem.quantity
    //             newQuantity = oldQuantity + 1
    //             return product
    //         }
    //         return Prod.findByPk(prodId)

    //     })
    //     .then(product => {
    //         return fetchedCart.addProduct1(product, {
    //             through: { quantity: newQuantity }
    //         })
    //     })
    //     .then(() => res.redirect('/cart'))
    //     .catch(err => console.log('Error while add to cart', err))

}

export const deleteCartItem = async (req, res, next) => {
    const prodId = req.body.productId
    
    req.user.getCart()
        .then(cart => {
            return cart.getProduct1s({where: {id: prodId}})
        })
        .then(products => {
            const product = products[0]
            return product.cartItem.destroy()
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log('Error in delete cart items', err))
}

export default { showCart, AddToCart, deleteCartItem }