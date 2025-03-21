import express from "express";
import path from 'path'
const router = express.Router()

router.use('/add-product', (req, res, next) => {
    // res.send('<form action="/admin/product" method="post"><input type="text" name="title"><button type="submit">Add Product</button></form>')

    res.sendFile(path.join(import.meta.dirname, '../', 'views', 'add-product.html'))
    
})

router.post('/product', (req, res, next) => {
    console.log('this is in product page'); 
    console.log(req.body)
    res.redirect('/')
})

export default router