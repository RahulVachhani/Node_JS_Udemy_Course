import Product from "../../models/product.js"
import Prod from "../../models/prod.js"

export const showAllProduct = (req, res, next) => {
    // Product.fetchAll()
    //     .then((result) => {
    //         res.render('shop/products', {
    //             products: result[0],
    //             pageTitle: 'Shop',
    //             path: '/'
    //         });
    //     })
    //     .catch(err => console.log(`
    // Error in showAllProduict`))

    Prod.findAll()
    .then(result => {
        // console.log(result)
        res.render('shop/products', {
            products: result,
            pageTitle: 'Shop',
            path: '/'
        });
    })
    .catch(err => console.log(`Error in show all product : ${err}`))
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
    // Product.findById(prodId)
    //     .then((product) => {
    //         console.log(product[0][0])
    //         res.render('shop/product-details', {
    //             product: product[0][0],
    //             pageTitle: 'Product Details',
    //             path: '/product-details'
    //         });
    //     })
    //     .catch(err => console.log(err));
    
    // Prod.findOne({where: {id:prodId}})
    Prod.findByPk(prodId)
    .then(product => {
        console.log(product)
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title||'Product Details',
            path: '/product-details'
        });
    })
    .catch(err => console.log(err));
}



export default { showAllProduct, showOrders, getProduct }