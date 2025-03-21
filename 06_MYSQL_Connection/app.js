import express from 'express'
import path from 'path'
import adminRoutes from './routes/admin/products.js'
import userRoutes from './routes/shop/shop.js'
import notFoundRoute from './routes/404.js'
import db from './utils/database.js'
import sequelize from './utils/sequelizeDatabase.js'
import Prod from './models/prod.js'
import User from './models/user.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use(express.urlencoded({extended:false}))


app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user
        next()
    })
    .catch(err => console.log(err))
})

// await db.execute('INSERT INTO product (title, price, imageUrl, description) VALUES ("book", 100, "a.jpg", "this is book");')

// const data = await db.execute('SELECT * FROM product;')
// // console.log(data)
// console.log(data[0])  // second data is metadata of the table

app.use(userRoutes)
app.use('/admin',adminRoutes)

app.use(notFoundRoute)

Prod.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Prod)

sequelize
    // .sync({force: true})
    // .sync()
    // .then(result => {
    //     // console.log(result);
    //     app.listen(3000, () => {
    //         console.log(`server is listening at http://localhost:3000`);    
    //     })
    // })
    // .catch(err => {
    //     console.log(err);
    // })
    .sync()
    .then(result => {
        return User.findByPk(1)
        
    })
    .then(user => {
        if(!user){
            return User.create({name:'Rahul', email : 'test@gamil.com'})
        }
        return user
    })
    .then(user => {
        // console.log(user);
        
        app.listen(3000, () => {
            console.log(`server is listening at http://localhost:3000`);    
        })
    })
    .catch(err => {
        console.log(err);
    })

   


