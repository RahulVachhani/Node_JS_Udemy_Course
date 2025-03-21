import express from 'express'


const app = express()

app.use('/', (req, res, next) => {
    console.log('This is always use')
    next()
})


// this middleware used when this path match 
app.use('/add-product', (req, res, next) => {
    console.log('this is add product page')
    res.send('This is add product page')
})

// this middleware used when does not match above path
// this is call when its start from / which does not match add-product 
app.use('/', (req, res, next) => {
    console.log('Middleware is used')
    res.send('<h1>Hello From App1</h1>')
})



app.listen(3000)
