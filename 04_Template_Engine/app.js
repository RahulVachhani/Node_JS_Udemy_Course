import express from 'express'
import path from 'path'
import adminRoutes from './routes/admin.js'
import userRoutes from './routes/shop.js'

// another template engine handdlerbars
// import expressHBs from 'express-handlebars'

const app = express()


// here we use hbs (anything we can write) then we save file with that extention
// app.engine('hbs', expressHBs.engine({
//     layoutsDir: 'views',
//     defaultLayout: null,
//     extname: 'hbs'
// }));
// app.set('view engine', 'hbs');
// app.set('views', 'views')

// // this is for pug
// app.set('view engine', 'pug')
// app.set('views', 'views')


// this is for ejs 
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use(express.urlencoded())

app.use(userRoutes)
app.use('/admin',adminRoutes)

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(import.meta.dirname, 'views', '404.html'))
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
})


app.listen(3000, () => {
    console.log(`server is listening at http://localhost:3000`);    
})

