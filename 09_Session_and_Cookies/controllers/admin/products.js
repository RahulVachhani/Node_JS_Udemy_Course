import Product from "../../models/product.js"

export const addProductPage = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.session.isLoggedIn
    })
}

export const addProduct = (req, res, next) => {
    // console.log(req.body)
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = parseFloat(req.body.price)
    const description = req.body.description
    const product = new Product({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.session.user
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
                isAuthenticated: req.session.isLoggedIn
            })
        })
}

export const postEditProduct = async (req, res, next) => {
    const prodId = req.body.productId
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = parseFloat(req.body.price)
    const description = req.body.description

    try {
        const product = await Product.findById(prodId)
        product.title = title
        product.imageUrl = imageUrl
        product.price = price
        product.description = description
        await product.save()
        res.redirect('/admin/show-products')
    }
    catch (err) {
        console.log(`Error in post Edit Product ${err}`)
    }
}


export const deleteProduct = async (req, res, next) => {
    const prodId = req.body.productId

    try {
        // await Product.deleteOne({_id: prodId});  // this is also work
        await Product.findByIdAndDelete(prodId);
        // await Product.findOneAndDelete({ _id: prodId });
        res.redirect('/admin/show-products');
    } catch (err) {
        console.log(`Error in delete Product ${err}`);
    }

}


export const showProduct = (req, res, next) => {
    Product.find()
        // .select('title price')
        .populate('userId', 'username email -_id')
        .then(products => {
            console.log(products);
            
            res.render('admin/show-products', {
                products: products,
                pageTitle: 'Shop',
                path: '/admin/show-products',
                isAuthenticated: req.session.isLoggedIn
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