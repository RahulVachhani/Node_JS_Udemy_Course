import express from "express";
import path from 'path'

const router = express.Router()

router.get('/', (req, res, next) => {
    // res.send('<h1>hello</h1><br><a href="/admin/add-product">add-product</a>')
    res.sendFile(path.join(import.meta.dirname, '../','views', 'shop.html'))
})

export default router