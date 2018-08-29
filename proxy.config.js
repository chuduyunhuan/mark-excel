
// @ts-check



const {
  npm_package_config_port: PORT = 4200,

} = process.env;



const endpoint = {

  PBE: 'https://spp-be-dev.spp-demo.deploy.hs-portal.eng.vmware.com',

};



const PROXY_CONFIG = {

  '/api/github': {
      target: 'https://api.github.com',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
          '^/api/github': '',
      },
  },

  '/api/': {
      target: `http://localhost:${ ~~PORT + 10 }`,
      changeOrigin: true,
      secure: false,
  },

  '/api-pbe/': {
      target: endpoint.PBE,
      changeOrigin: true,
      secure: false,
      pathRewrite: {
          '^/api-pbe': '/api',
      },
      onProxyRes (proxyResponse) {
          const cookies = proxyResponse.headers['set-cookie'];
          const prune = (cookie = '') => cookie.replace(/;\W*secure/gi, '');

          if (cookies) {
              proxyResponse.headers['set-cookie'] = cookies.map(prune);
          }
      }
  },

};



module.exports = PROXY_CONFIG;

