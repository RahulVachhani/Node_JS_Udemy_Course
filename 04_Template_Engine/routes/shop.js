import express from "express";
import path from 'path'
import {products} from './admin.js'

const router = express.Router()

router.get('/', (req, res, next) => {
    console.log(products)
    // res.sendFile(path.join(import.meta.dirname, '../','views', 'shop.html'))

    res.render('shop', {products, docTitle:'Shop'})
})

export default router