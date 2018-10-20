const http = require('http')

// This server is an EventEmiiter so all 
// on, emit and addListeners are available
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Send this respinse')
        res.end()
    }
    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3]))
        res.end()
    }
})   
// server.on('connection', (socket) => {
//     console.log('New Connection')
// })
server.listen(8000)
console.log('Listening on port 8000....')