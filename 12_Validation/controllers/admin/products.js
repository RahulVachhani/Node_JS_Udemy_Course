import Product from "../../models/product.js"
import User from "../../models/user.js"
import { validationResult } from "express-validator"

export const addProductPage = (req, res, next) => {
   
    res.render('admin/add-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product',
        editing: false,
        hasError: false,
        errorMessage: []
    })
}

export const addProduct = (req, res, next) => {
    
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = parseFloat(req.body.price)
    const description = req.body.description
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).render('admin/add-product', {
            pageTitle: "Add Product",
            path: '/admin/add-product',
            editing: false,
            hasError: true,
            product: {
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description
            },
            errorMessage: [errors.array()[0].msg]
        })
    }
    const product = new Product({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user
    })
    product.save()
        .then(result => {
            // console.log(result)
            console.log('Product is created')
            res.redirect('/admin/add-product')
        })
        .catch(err => console.log(`Error in add product : ${err}`))
}

export const editProductPage = (req, res, next) => {
   
    const editMode = req.query.edit
    const prodId = req.params.productId
   
    
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/add-product', {
                pageTitle: "Add Product",
                path: '/admin/add-product',
                editing: editMode,
                product: product,
                hasError: false,
                errorMessage: []
            })
        })
}

export const postEditProduct = async (req, res, next) => {
   
    const prodId = req.body.productId
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = parseFloat(req.body.price)
    const description = req.body.description
    const errors = validationResult(req)
    console.log(errors.array())
    if(!errors.isEmpty()){
        return res.status(422).render('admin/add-product', {
            pageTitle: "Edit Product",
            path: '/admin/add-product',
            editing: true,
            hasError: true,
            product: {
                _id: prodId,
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description
            },
            errorMessage: [errors.array()[0].msg]
        })
    }

    try {
        const product = await Product.findById(prodId)
        if(product.userId._id.toString() !== req.user._id.toString()){
            return res.redirect('/')
        }
        product.title = title
        product.imageUrl = imageUrl
        product.price = price
        product.description = description
        await product.save()
        res.redirect('/admin/show-products')
    }
    catch (err) {
        console.log(`Error in post Edit Product ${err}`)
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
    }
}


export const deleteProduct = async (req, res, next) => {
    const prodId = req.body.productId
   
    try {
        await Product.deleteOne({_id: prodId, userId: req.user._id});  // this is also work
        
        await User.updateMany(
            { 'cart.items.productId': prodId },  // Find users who have this product in their cart
            { $pull: { 'cart.items': { productId: prodId } } }  // Remove it from their cart
        );
        res.redirect('/admin/show-products');
    } catch (err) {
        console.log(`Error in delete Product ${err}`);
    }

}


export const showProduct = (req, res, next) => {
   
    Product.find({userId: req.user})
        // .select('title price')
        // .populate('userId')
        .then(products => {
            // console.log(products);
           
            res.render('admin/show-products', {
                products: products,
                pageTitle: 'Shop',
                path: '/admin/show-products',
            });
        
        })
        .catch(err => console.log(`Error in show all product : ${err}`))

}


export default {
    addProductPage,
    addProduct,
    showProduct,
    editProductPage,
    postEditProduct,
    deleteProduct
}