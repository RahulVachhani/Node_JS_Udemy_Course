import http from 'http'

import express from 'express'

const app = express()

app.use((req, res, next) => {
    console.log('In the middleware')
    next()   // its use for run or add another middleware in next
})

app.use((req, res, next) => {
    console.log('In the middleware 2')
    res.send('<h1> Hello </h1>')
})

// const server = http.createServer(app)

// server.listen(3000)

// Both are same working functionality
app.listen(3000)

