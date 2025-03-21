import http from 'http'

const users = ['Rahul']
const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    res.setHeader('Content-Type', 'text/html')

    if (url === '/'){
        res.write('<html>')
        res.write('<body>')
        res.write('<form method="post" action="/create-user">')
        res.write('<input type="text" name="username" />')
        res.write('<button type="submit"> Submit </button>')
        res.write('</form>')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }
    else if (url === '/users'){
        res.write('<ul>')
        users.forEach((user) => res.write(`<li> ${user} </li>`))
        // res.write('<li> User 1 </li>')
        // res.write('<li> User 2 </li>')
        // res.write('<li> User 3 </li>')
        // res.write('<li> User 4 </li>')
        res.write('</ul>')
        return res.end()
    }
    else if(url === '/create-user' && method == 'POST'){
        let body = []

        req.on('data' , (chunk) => {
            body.push(chunk)
        })
        req.on('end', () => {
            const parseData = Buffer.concat(body).toString()
            console.log(parseData)
            const user = parseData.split('=')[1]
            users.push(user)
            res.statusCode = 302
            res.setHeader('Location', '/')
            return res.end()
        })
    }
})

const PORT = 3000

server.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    
})