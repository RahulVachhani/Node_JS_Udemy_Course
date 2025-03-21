import Product  from "../../models/product.js"

export const showAllProduct = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/products', {
             products :products, 
             pageTitle: 'Shop',
             path: '/' 
        });
    });
}

export const showOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/Orders'
    })
}

export const getProduct = (req, res, next) => {
    const prodId = req.params.productId
    // console.log(prodId)
    Product.findById(prodId,(product) => {
        res.render('shop/product-details', {
            product :product, 
            pageTitle: 'Product Details',
            path: '/product-details'
        });
    });
}



export default {showAllProduct, showOrders, getProduct}