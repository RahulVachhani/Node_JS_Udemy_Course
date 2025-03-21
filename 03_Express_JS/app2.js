import express from "express";
import path from 'path'
import adminRoutes from './routes/admin.js'
import userRoutes from './routes/shop.js'


const app = express()

// this is used for take take data from req.body
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(import.meta.dirname, 'public')))

app.use(userRoutes)
app.use('/admin',adminRoutes)

app.use((req, res, next) => {
    // res.status(404).send('<h1> Page not found</h1>')
    res.status(404).sendFile(path.join(import.meta.dirname, 'views', '404.html'))
})

app.listen(3000)