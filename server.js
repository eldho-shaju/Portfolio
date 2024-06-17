// server.js
const express = require("express");
const https = require("https");
const { readFileSync } = require("fs");
const { parse } = require("url"); // Destructuring for parse function
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync("./key.pem"),
  cert: readFileSync("./cert.pem"),
};

app.prepare().then(() => {
  const server = express();

  server.all("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  https.createServer(httpsOptions, server).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on https://localhost:3000");
  });
});
