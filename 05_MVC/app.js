import express from 'express'
import path from 'path'
import adminRoutes from './routes/admin/products.js'
import userRoutes from './routes/shop/shop.js'
import notFoundRoute from './routes/404.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use(express.urlencoded({extended:false}))

app.use(userRoutes)
app.use('/admin',adminRoutes)

app.use(notFoundRoute)

app.listen(3000, () => {
    console.log(`server is listening at http://localhost:3000`);    
})

