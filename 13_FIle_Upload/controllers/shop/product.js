// import fs from 'fs/promises'
import fs from 'fs'
import path from 'path'

import Product from "../../models/product.js"
import Order from "../../models/order.js";

import PDFDocument from 'pdfkit'


export const showAllProduct = (req, res, next) => {

    Product.find()
        .then(products => {
            // console.log(req.session.isLoggedIn);

            res.render('shop/products', {
                products: products,
                pageTitle: 'Shop',
                path: '/',
                // isAuthenticated: req.session.isLoggedIn,
                // csrfToken: req.csrfToken()
            });
        })
        .catch(err => console.log(`Error in show all product : ${err}`))
}

export const showOrders = async (req, res, next) => {
    console.log('hello from orders');
    try {
        const orders = await Order.find({ 'user.userId': req.session.user._id })

        // console.log(orders[0].products[0].product);
        // console.log(orders)

        res.render('shop/orders', {
            pageTitle: 'Orders',
            path: '/orders',
            orders: orders,
        })
    } catch (err) {
        console.log('Error in show cart', err);
    }

}

export const createOrder = async (req, res, next) => {
    try {
        await req.user.populate('cart.items.productId')

        const products = req.user.cart.items.map(i => {
            return { quantity: i.quantity, product: { ...i.productId._doc } }
        })
        // console.log(products);
        if (!products.length > 0) {
            return res.redirect('/cart')
        }
        const order = new Order({
            user: {
                email: req.user.email,
                userId: req.session.user
            },
            products: products
        })
        await order.save()
        await req.user.clearCart()
        res.redirect('/orders')
    }
    catch (err) {
        console.log('Error in create Order', err)
    }
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
            });
        })
        .catch(err => console.log(err));
}

// export const getInvoice = async (req, res, next) => {
//     const orderId = req.params.orderId

//     const invoiceName = 'invoice-' + orderId + '.pdf'
//     const invoicePath = path.join('invoices', invoiceName)

//     try {

//         const order = await Order.findById(orderId)

//         if (order.user.userId.toString() === req.user._id.toString()) {
//             // const invoice = await fs.readFile(invoicePath)   // this is use "fs/promises"

//             res.setHeader('Content-Type', 'application/pdf')
//             res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`)

//             // return res.send(invoice)

//             const fileStream = fs.createReadStream(invoicePath)
//             fileStream.pipe(res)
//         }
//         else {
//             console.log('h')
//             return next(new Error('Err'))
//         }

//     } catch (err) {
//         console.log('Error in get invoice', err)
//         const error = new Error(err)
//         error.httpStatusCode = 500
//         return next(error)
//     }

// }



export const getInvoice = async (req, res, next) => {
    const orderId = req.params.orderId

    const invoiceName = 'invoice-' + orderId + '.pdf'
    const invoicePath = path.join('invoices', invoiceName)

    try {

        const order = await Order.findById(orderId)

        if (order.user.userId.toString() === req.user._id.toString()) {

            const pdfDoc = new PDFDocument()
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`)

            // pdfDoc.pipe(fs.createWriteStream(invoicePath))
            // pdfDoc.pipe(res)
            // pdfDoc.text('hello world')
            // pdfDoc.text(`${req.user.email}`)
            // pdfDoc.end()

            pdfDoc.pipe(fs.createWriteStream(invoicePath))
            pdfDoc.pipe(res)
            pdfDoc.fontSize(26).text('Invoice', {
                underline: true,
                align: 'center'
            })
            pdfDoc.text('------------------------------')
            let totalPrice = 0;
            order.products.forEach(product => {
                totalPrice += product.quantity * product.product.price
                pdfDoc.fontSize(14).text(product.product.title+ ' - '+ product.quantity + ' x '+ ' $'+product.product.price+ ' = ' + `${'$'+product.product.price * product.quantity}`)
            })
            pdfDoc.fontSize(26).text('------------------------------')
            pdfDoc.fontSize(18).text('Total Price $'+totalPrice)
            pdfDoc.end()
        }
        else {
            console.log('h')
            return next(new Error('Err'))
        }

    } catch (err) {
        console.log('Error in get invoice', err)
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
    }

}

export default { showAllProduct, showOrders, getProduct, createOrder, getInvoice }