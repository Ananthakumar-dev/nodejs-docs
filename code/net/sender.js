// send tcp request to receiver

const net = require("node:net");

const conn = net.createConnection({host: "127.0.0.1", port: 3099})

conn.write("Send a packet to receiver");