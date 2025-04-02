import Product from "../../models/product.js"
import Order from "../../models/order.js";

export const showAllProduct = (req, res, next) => {

    Product.find()
        .then(products => {
            // console.log(req.session.isLoggedIn);
            
            res.render('shop/products', {
                products: products,
                pageTitle: 'Shop',
                path: '/',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(`Error in show all product : ${err}`))
}

export const showOrders = async(req, res, next) => {
    const orders = await Order.find({ 'user.userId': req.session.user._id })
    // console.log(orders[0].products[0].product);
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn
    })     
}

export const createOrder = async (req, res, next) => {
    try {
        await req.session.user.populate('cart.items.productId')
    
        const products = req.session.user.cart.items.map(i => {           
            return { quantity: i.quantity, product: { ...i.productId._doc } }
        })
        // console.log(products);
        
        const order = new Order({
            user: {
                name: req.session.user.username,
                userId: req.session.user
            },
            products: products
        })
        await order.save()
        await req.session.user.clearCart()
    }
    catch(err){
        console.log('Error in create Order', err)
    }
    res.redirect('/')
}

export const getProduct = (req, res, next) => {
    const prodId = req.params.productId

    Product.findById(prodId)
        .then(product => {
            // console.log(product)
            res.render('shop/product-details', {
                product: product,
                pageTitle: product.title || 'Product Details',
                path: '/product-details',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
}



export default { showAllProduct, showOrders, getProduct, createOrder }