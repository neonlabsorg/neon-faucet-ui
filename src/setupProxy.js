const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = createProxyMiddleware({
  target: "https://api.neonfaucet.org/",
  changeOrigin: true,
});

module.exports = (app) => {
  app.use("/request_*", proxy);
};
