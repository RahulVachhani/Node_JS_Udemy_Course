const fs = require('fs')

const requestHandler = (req,res) => {

    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write(
            `<html>
            <head c>
                <title>Enter Message</title>
            </head>
            <body>
                <form action="/message" method="post">
                    <input type="text" name="message"/>
                    <button type="submit">Send</button>
                </form>
            </body>
        </html>`
        )
        return res.end()
    }

    if (url === '/message' && method === 'POST') {

        let body = []
        req.on('data', (chunk) => {
            console.log(`CHUNKS ==>  ${chunk}`)
            body.push(chunk)
        })

        return req.on('end', () => {
            console.log(`Raw Body ==> ${body}`)

            const parsedBody = Buffer.concat(body).toString()

            console.log(`Parsed Body ==>`, parsedBody)

            const message = parsedBody.split('=')[1]

            fs.writeFile('message.txt', message, (err) => {
                if (err) console.log('Error ===>', err);

                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })

        res.write('hello')
        res.end()
    }

}

// module.exports = {requestHandler}

module.exports = {
    handler : requestHandler,
    someText : "My name is Rahul"
}