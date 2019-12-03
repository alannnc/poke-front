const express = require("express");
const next = require("next");
require("dotenv").config();

const devProxy = {
  "/api": {
    target: `${process.env.BASE_URL}:${process.env.BASE_PORT}`,
    pathRewrite: { "^/api": "/" },
    changeOrigin: true,
    onProxyRes: function(proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    }
  }
};

const port = parseInt(process.env.PORT, 10) || 3000;
// @TODO edit env with process.env
const env = "development";
const dev = env !== "production";
const app = next({
  dir: "./src", // base directory where everything is, could move to src later
  dev
});

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    // Set up the proxy.
    if (dev && devProxy) {
      const proxyMiddleware = require("http-proxy-middleware");
      Object.keys(devProxy).forEach(function(context) {
        server.use(proxyMiddleware(context, devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all("*", (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port} [${env}]`);
    });
  })
  .catch(err => {
    console.log("An error occurred, unable to start the server");
    console.log(err);
  });
