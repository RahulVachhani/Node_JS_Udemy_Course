import Product from "../../models/product.js"

export const showAllProduct = (req, res, next) => {
   
    Product.fetchAll()
        .then(products => {
            res.render('shop/products', {
                products: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log(`Error in show all product : ${err}`))
}

export const showOrders = (req, res, next) => {
   
    req.user.getOrders()
        .then(orders => {
            console.log(orders);
            
            res.render('shop/orders', {
                pageTitle: 'Orders',
                path: '/orders',
                orders : orders
            })
            // res.redirect('/')
        })
}

export const createOrder = (req, res, next) => {
    req.user.addOrder()
        .then(() => {
            res.redirect('/orders')
        })
        .catch(err => console.log('Error in create oder function', err))
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