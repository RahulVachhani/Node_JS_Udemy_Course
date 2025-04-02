import Product from "../../models/product.js"
import Order from "../../models/order.js";

export const showAllProduct = (req, res, next) => {

    Product.find()
        .then(products => {
            res.render('shop/products', {
                products: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log(`Error in show all product : ${err}`))
}

export const showOrders = async(req, res, next) => {
    const orders = await Order.find({ 'user.userId': req.user._id })
    // console.log(orders[0].products[0].product);
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
        orders: orders
    })     
}

export const createOrder = async (req, res, next) => {
    try {
        await req.user.populate('cart.items.productId')
    
        const products = req.user.cart.items.map(i => {           
            return { quantity: i.quantity, product: { ...i.productId._doc } }
        })
        // console.log(products);
        
        const order = new Order({
            user: {
                name: req.user.username,
                userId: req.user
            },
            products: products
        })
        await order.save()
        await req.user.clearCart()
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
                path: '/product-details'
            });
        })
        .catch(err => console.log(err));
}



export default { showAllProduct, showOrders, getProduct, createOrder }