'use strict';

const http = require('http');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathName = url.pathname.slice(1).split('?')[0];
    const parts = pathName ? pathName.split('/') : {};
    const query = Object.fromEntries(url.searchParams.entries());

    res.setHeader('Content-Type', 'application/json');

    try {
      res.statusCode = 200;
      res.end(JSON.stringify({ parts, query }));
    } catch {
      res.statusCode = 400;
      res.end();
    }
  });
}

module.exports = {
  createServer,
};
