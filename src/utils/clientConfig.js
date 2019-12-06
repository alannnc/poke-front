const clientConfig = {
  baseUrl: process.env.BASE_URL || "http://127.0.0.1",
  port: process.env.BASE_PORT || 3000,
  proxyUrl: process.env.PROXY_URL || "https://poke-front.alannnc.now.sh/api"
};

module.exports = clientConfig;
