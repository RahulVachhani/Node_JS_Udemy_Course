const http = require('http')

const server = http.createServer((req, res) => {
    // console.log(req)
    // process.exit()  // this never used because its will terminate the execution of the program

    console.log(req.url, req.method, req.headers)
})

server.listen(3000)