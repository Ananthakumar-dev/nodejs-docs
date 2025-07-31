const http = require("http");
const fs = require("fs/promises")

const port = 8050;
// const hostname = '192.168.43.235'
const hostname = "127.0.0.1"; // this is the loop back address no one in the world cant access to it.

const server = http.createServer(async (req, res) => {
  if(req.url === '/create-post') {
    let chunk = ''
    req.on('data', (data) => {
        chunk += data
    })

    req.on('end', () => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({ title: 'Post created successfully' }))
    })
  }

  if(req.url === '/' && req.method === 'GET') {
    const fileHandle = await fs.open("./public/index.html")
    const readStream = fileHandle.createReadStream()

    res.setHeader('Content-Type', 'text/html')
    readStream.pipe(res)

    readStream.on("end", () => {
      fileHandle.close()
    })
  }

  if(req.url === '/upload' && req.method === 'PUT') {
    const fileHandle = await fs.open('./storage/image.png', 'w');
    const writeStream = fileHandle.createWriteStream();
    console.log(req);

    req.pipe(writeStream)
    req.on("end", () => {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ 'message': 'File uploaded' }));
    })
  }
});

server.listen(port, hostname, () => {
  console.log("server listening on port: 8050");
});
