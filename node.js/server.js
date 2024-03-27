const http = require('http');
const url = require('url');

const host = 'localhost';
// 127.0.0.1 -> look back = 서버를 실행한 컴퓨터

const port = 3000;

const server = http.createServer((req, res) => {

    const path = url.parse(req.url).pathname;

    if (path === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end('<h1>hello world</h1>')
    }
    else if (path === '/post') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end('<h1>post</h1>')
    }
    else if (path === '/user') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end('<h1>user</h1>')
    }
    else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h1>Not found</h1>')
    }
});

server.listen(port, host, () => {
    console.log('server running on http://localhost:3000');
});