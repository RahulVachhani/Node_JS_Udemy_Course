import Cart from "../../models/cart.js"
import Product from "../../models/product.js"
import Prod from "../../models/prod.js"

export const showCart = (req, res, next) => {
    // Cart.fetchAllItems(cart => {
    //     res.render('shop/cart', {
    //         pageTitle: 'Cart',
    //         path: '/cart',
    //         cart: cart
    //     })
    // })

    // req.user.getCart()
    //     .then(cart => {
    //         // console.log(cart)
    //         return cart.getProduct1s()
    //             .then(products => {
    //                 res.render('shop/cart', {
    //                     pageTitle: 'Cart',
    //                     path: '/cart',
    //                     cart: products
    //                 })
    //             })
    //     })
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
    // console.log(prodId);
    // Product.findById(prodId, (product) => {
    //     Cart.addToCart(prodId, product.price)
    // })

    // res.redirect('/')  
    let fetchedCart;
    let newQuantity = 1
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart
            return cart.getProduct1s({ where: { id: prodId } })
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0]
            }

            if (product) {
                const oldQuantity = product.cartItem.quantity
                newQuantity = oldQuantity + 1
                return product
            }
            return Prod.findByPk(prodId)

        })
        .then(product => {
            return fetchedCart.addProduct1(product, {
                through: { quantity: newQuantity }
            })
        })
        .then(() => res.redirect('/cart'))
        .catch(err => console.log('Error while add to cart', err))

}

export const deleteCartItem = async (req, res, next) => {
    const prodId = req.body.productId
    // Cart.delete1(prodId)
    // res.redirect('/cart')

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