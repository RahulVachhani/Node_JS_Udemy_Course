const http = require('http')

const server = http.createServer((req, res) => {
    // console.log(req.url)
    res.setHeader('Content-Type', 'text/html')
    res.write(
        `<html> 
            <head><title>Hello</title></head>
            <body> 
                 <h1>hello from server</h1>
            </body>
        </html>`
    )
    res.end()
})

server.listen(3000)