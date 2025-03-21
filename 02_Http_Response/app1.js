const http = require('http')
// const {requestHandler} = require('./route.js')
const {handler, someText} = require('./route')


// const server = http.createServer(requestHandler)


const server = http.createServer(handler)
console.log(someText)

server.listen(3000)