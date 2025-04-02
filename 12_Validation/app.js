import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import session from 'express-session'
import connectMongoDBSession from 'connect-mongodb-session'
import csrf from 'csurf'
import flash from 'connect-flash';

import adminRoutes from './routes/admin/products.js'
import userRoutes from './routes/shop/shop.js'
import notFoundRoute from './routes/404.js'
import authRoutes from './routes/auth/auth.js'

import { PORT } from './env.js'
import User from './models/user.js'

const MONGODB_URI = 'mongodb+srv://Rahul:123%40Rahul@fastapi.k9cht.mongodb.net/shop'

const app = express()

const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

const csrfProtection = csrf()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}))
app.use(flash())

app.use((req, res, next) => {
    if(!req.session.user){
        return next()
    }
    User.findById(req.session.user)
    .then(user => {        
        req.user = user
        next()
    })
    .catch(err => console.log('Error in middleware'))
})

app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.use(csrfProtection)

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    res.locals.isAuthenticated = req.session.isLoggedIn
    next()
})

app.use('/admin', adminRoutes)
app.use(authRoutes)
app.use(userRoutes)

app.use(notFoundRoute)

app.use((error, req, res, next) => {
    res.redirect('/500')
})

mongoose.connect(MONGODB_URI)
.then(() => {
    app.listen(PORT||3000, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
})
.catch(err => console.log('Error in mongoose connection', err))




