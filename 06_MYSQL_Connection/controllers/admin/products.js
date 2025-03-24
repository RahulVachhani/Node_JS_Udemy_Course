import Product from "../../models/product.js"
import Prod from "../../models/prod.js"

export const addProductPage = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product',
        editing: false
    })
}

export const addProduct = (req, res, next) => {
    // console.log(req.body)
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = parseFloat(req.body.price)
    const description = req.body.description
    // const product = new Product(null, title, imageUrl, price, description)
    // product.save().then(() => {
    //     res.redirect('/')
    // })


    // Prod.create({
    //     title: title,
    //     imageUrl: imageUrl,
    //     price: price,
    //     description: description
    // })
    //     .then(result => {
    //         console.log(result)
    //         res.redirect('/admin/add-product')
    //     })
    //     .catch(err => console.log(`Error in add product : ${err}`))


    req.user.createProduct1({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
    })
        .then(result => {
            // console.log(result)
            res.redirect('/admin/add-product')
        })
        .catch(err => console.log(`Error in add product : ${err}`))
}

export const editProductPage = (req, res, next) => {
    const editMode = req.query.edit
    const prodId = req.params.productId
    // Product.findById(prodId)
    //     .then(product => {
    //         if (!product) {
    //             return res.redirect('/')
    //         }
    //         res.render('admin/add-product', {
    //             pageTitle: "Add Product",
    //             path: '/admin/add-product',
    //             editing: editMode,
    //             product: product[0][0]
    //         })
    //     })

    // Prod.findByPk(prodId)
    //     .then(product => {
    //         if (!product) {
    //             return res.redirect('/')
    //         }
    //         res.render('admin/add-product', {
    //             pageTitle: "Add Product",
    //             path: '/admin/add-product',
    //             editing: editMode,
    //             product: product
    //         })
    //     })

    req.user.getProduct1s({ where: { id: prodId } })
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/add-product', {
                pageTitle: "Add Product",
                path: '/admin/add-product',
                editing: editMode,
                product: product[0]
            })
        })
}

export const postEditProduct = (req, res, next) => {
    const prodId = req.body.productId
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description

    // const product = new Product(prodId, title, imageUrl, price, description)
    // product.save()
    //     .then(() => res.redirect('/admin/show-products'))
    //     .catch(err => console.log(`Error in post Edit Product ${err}`));

    // Prod.findByPk(prodId)
    //     .then(product => {
    //         product.title = title,
    //             product.imageUrl = imageUrl,
    //             product.price = price,
    //             product.description = description
    //         product.save()
    //         res.redirect('/admin/show-products')
    //     })
    //     .catch(err => console.log(`Error in post Edit Product ${err}`));

    req.user.getProduct1s({ where: { id: prodId } })
        .then(product => {
            // console.log(product)
            product = product[0]
            product.title = title,
            product.imageUrl = imageUrl,
            product.price = price,
            product.description = description
            product.save()
            res.redirect('/admin/show-products')
        })
        .catch(err => console.log(`Error in post Edit Product ${err}`));
}


export const deleteProduct = (req, res, next) => {
    const prodId = req.body.productId

    // Product.delete(prodId)
    //     .then(() => res.redirect('/admin/show-products'))
    //     .catch((err) => console.log(`Error in delete Product ${err}`))

    Prod.findByPk(prodId)
        .then(product => product.destroy())
        .then(() => res.redirect('/admin/show-products'))
        .catch((err) => console.log(`Error in delete Product ${err}`))

}


export const showProduct = (req, res, next) => {
    // Product.fetchAll()
    //     .then((result) => {
    //         res.render('admin/show-products', {
    //             products: result[0],
    //             pageTitle: 'Shop',
    //             path: '/admin/show-products'
    //         });
    //     })
    //     .catch(err => console.log(`Error in show Product Admin`))

    // Prod.findAll()
    //     .then(result => {
    //         // console.log(result)
    //         res.render('admin/show-products', {
    //             products: result,
    //             pageTitle: 'Shop',
    //             path: '/admin/show-products'
    //         });
    //     })
    //     .catch(err => console.log(`Error in show all product : ${err}`))

    req.user.getProduct1s()
        .then(products => {
            res.render('admin/show-products', {
                products: products,
                pageTitle: 'Shop',
                path: '/admin/show-products'
            });
        })
        .catch(err => console.log(`Error in show all product : ${err}`))

}


export default { addProductPage, addProduct, showProduct, editProductPage, postEditProduct, deleteProduct }