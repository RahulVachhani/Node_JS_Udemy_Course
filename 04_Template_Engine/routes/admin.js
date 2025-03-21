import express from "express"
import path from 'path'
const router = express.Router()

export const products= []

router.get('/add-product', (req, res, next) => {

    res.sendFile(path.join(import.meta.dirname, '../', 'views', 'add-product.html'))
    
})

router.post('/product', (req, res, next) => {
    console.log(req.body)
    products.push({title: req.body.title})
    res.redirect('/')
})

export default router