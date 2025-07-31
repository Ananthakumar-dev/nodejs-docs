const net = require("node:net")

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        socket.write(data.toString("utf-8"))
    })
})

const conn = server.on('connection', () => {
    console.log('A connection made');
})

server.listen(3008, () => {
    console.log("server listening")
})