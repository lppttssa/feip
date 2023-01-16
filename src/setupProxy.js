const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/products',
    createProxyMiddleware({
      target: 'http://kitvlad.online:8080',
      changeOrigin: true,
    })
  );
  app.use(
      '/categories',
      createProxyMiddleware({
        target: 'http://kitvlad.online:8080',
        changeOrigin: true,
      })
  );
};