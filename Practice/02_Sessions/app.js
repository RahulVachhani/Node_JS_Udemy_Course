import { PORT } from './env.js'

import express from 'express'

const app = express()


app.get('/', (req, res, next) => {
    res.send('hello')
    res.end()
})

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)    
})