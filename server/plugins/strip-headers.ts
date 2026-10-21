// Remove framework fingerprint headers from rendered responses.
// nginx version disclosure (`Server: nginx/1.28.3 (Ubuntu)`) must be handled
// separately with `server_tokens off;` / headers-more on the web server.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response) => {
    if (!response.headers) return
    delete response.headers['x-powered-by']
    delete response.headers['X-Powered-By']
  })
})
