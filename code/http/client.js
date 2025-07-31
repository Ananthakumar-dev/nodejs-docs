const http = require("http");

const agent = new http.Agent({ keepAlive: true });

const request = http.request({
  agent: agent,
  host: "127.0.0.1",
  port: 8050,
  method: 'POST',
  path: '/create-post',
  headers: {
    "Content-Type": "application/json",
  },
});

request.on("response", (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk.toString('utf-8')
  })

  response.on('end', () => {
    console.log(JSON.parse(data))
  })

  console.log(response.headers)
});

request.end(
  JSON.stringify({ title: "Hello world!", body: "This is the request" })
);
