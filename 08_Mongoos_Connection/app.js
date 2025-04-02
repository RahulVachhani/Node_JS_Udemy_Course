
import express from 'express'
import path from 'path'
import { PORT } from './env.js'

import adminRoutes from './routes/admin/products.js'
import userRoutes from './routes/shop/shop.js'
import notFoundRoute from './routes/404.js'
// import mongoConnect from './utils/database.js'
import User from './models/user.js'
import mongoose from 'mongoose'

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use((req, res, next) => {
    User.findById('67e27df442262f1d0131fb7c')
    .then(user => {
        req.user = user
        next()
    })
    .catch(err => console.log('Error in middleware'))
})

app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.use(userRoutes)
app.use('/admin', adminRoutes)

app.use(notFoundRoute)

// mongoConnect(() => {
//     app.listen(PORT, () => {
        // console.log(`Server is running at http://localhost:${PORT}`);
        
//     })
// })

mongoose.connect('mongodb+srv://Rahul:123%40Rahul@fastapi.k9cht.mongodb.net/shop')
// .then(() => {
//     const user = new User({
//         username: 'Rahul',
//         email: 'rahul@gmail.com',
//         cart: {
//             items: []
//         }
//     })
//     return user.save()
// })
.then((user) => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
})
.catch(err => console.log('Error in mongoose connection', err))




