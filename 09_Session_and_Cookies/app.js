
import express from 'express'
import path from 'path'
import { PORT } from './env.js'
import mongoose from 'mongoose'
import session from 'express-session'
import connectMongoDBSession from 'connect-mongodb-session'

const MongoDBStore = connectMongoDBSession(session);

import adminRoutes from './routes/admin/products.js'
import userRoutes from './routes/shop/shop.js'
import notFoundRoute from './routes/404.js'
// import mongoConnect from './utils/database.js'
import User from './models/user.js'
import authRoutes from './routes/auth/auth.js'

const MONGODB_URI = 'mongodb+srv://Rahul:123%40Rahul@fastapi.k9cht.mongodb.net/shop'

const app = express()

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

store.on('error', function(error) {
    console.error('Session Store Error:', error);
});

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}))

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


app.use('/admin', adminRoutes)
app.use(authRoutes)
app.use(userRoutes)

app.use(notFoundRoute)


mongoose.connect('mongodb+srv://Rahul:123%40Rahul@fastapi.k9cht.mongodb.net/shop')
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
})
.catch(err => console.log('Error in mongoose connection', err))




