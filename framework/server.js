const Butter = require('./butter')

const host = '127.0.0.1'
const port = 4050

const server = new Butter();

server.route('get', '/', (req, res) => {
    res.sendFile('./public/index.html', 'text/html');
})

server.listen(host, port, () => {
    console.log(`server running on http://${host}:${port}`)
})