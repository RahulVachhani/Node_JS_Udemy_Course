import Product  from "../../models/product.js"

export const addProductPage = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle : "Add Product",
        path: '/admin/add-product',
        editing : false
    })
}

export const addProduct = (req, res, next) => {
    // console.log(req.body)
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = parseFloat(req.body.price)
    const description = req.body.description
    const product = new Product(null, title, imageUrl, price, description)
    product.save()
    res.redirect('/')
}

export const editProductPage = (req, res, next) => {
    const editMode = req.query.edit
    const prodId = req.params.productId
    Product.findById(prodId, (product) => {
        if (!product){
            return res.redirect('/')
        }
        res.render('admin/add-product', {
            pageTitle : "Add Product",
            path: '/admin/add-product',
            editing: editMode,
            product: product

        })
    })   
}
 
export const postEditProduct = (req, res, next) => {
    const prodId = req.body.productId
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description

    const product = new Product(prodId, title, imageUrl, price, description)
    product.save()
    return res.redirect('/admin/show-products')
}


export const deleteProduct = (req, res, next) => {
    const prodId = req.body.productId

    Product.delete(prodId)
    return res.redirect('/admin/show-products')

}


export const showProduct = (req, res, next) => {
     Product.fetchAll((products) => {
            res.render('admin/show-products', {
                 products :products, 
                 pageTitle: 'Shop',
                 path: '/admin/show-products' 
            });
    });
}



export default { addProductPage, addProduct, showProduct, editProductPage, postEditProduct , deleteProduct}