const http = require('http')
const fs = require('fs/promises')

class Butter {
    constructor() {
        this.server = http.createServer();
        this.routes = {}

        this.server.on("request", (req, res) => {
            res.sendFile = async (filePath, mime) => {
                const fileHandle = await fs.open(filePath, "r")
                const readSteam = fileHandle.createReadStream()

                res.setHeader("Content-Type", mime)
                readSteam.pipe(res);
            }

            res.status = (code) => {
                res.statusCode = code;

                return res;
            }

            res.json = (data) => {
                res.setHeader('Content-Type', 'application/json')

                res.end(JSON.stringify(data))
            }

            if(!this.routes[req.method.toLowerCase() + req.url]) {
                return res.status(404).end();
            }

            this.routes[req.method.toLowerCase() + req.url](req, res);
        })
    }

    listen(host, port, cb) {
        this.server.listen(port, host, () => {
            cb();
        })
    }

    route(method, path, cb) {
        this.routes[method + path] = cb;
    }
}

module.exports = Butter;