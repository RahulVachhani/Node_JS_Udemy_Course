
import express from 'express'
import path from 'path'
import { PORT } from './env.js'

import adminRoutes from './routes/admin/products.js'
import userRoutes from './routes/shop/shop.js'
import notFoundRoute from './routes/404.js'
import mongoConnect from './utils/database.js'
import User from './models/user.js'

const app = express()


app.set('view engine', 'ejs')
app.set('views', 'views')

app.use((req, res, next) => {
    User.findById('67e135622907530ff4eb5239')
    .then(user => {
        req.user = new User(user.username, user.email, user.cart, user._id)
        // console.log(req.user)
        next()
    })
    .catch(err => console.log('Error in middleware'))
})

app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use(express.urlencoded({ extended: false }))



app.use(userRoutes)
app.use('/admin', adminRoutes)

app.use(notFoundRoute)

mongoConnect(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
        
    })
})





