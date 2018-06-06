const http = require('http')
const chalk = require('chalk')
const path = require('path')
const conf = require('./config/defaultConfig.js')
const router = require('./helper/router.js')
const openUrl = require('./helper/openUrl.js')

class Server {
  constructor (config) {
    this.config = Object.assign({}, conf, config)
  }

  start () {
    const server = http.createServer((req, res) => {
      console.log(`req.url:${req.url}`)
      const filePath = path.join(this.config.root, req.url); // E:\test02\nodejs\demo1\template\dir.tpl
      router(req, res, filePath);
    });

    server.listen(this.config.port, this.config.hostName, () => {
    	console.log('server is running')
      const addr = `http://${this.config.hostName}:${this.config.port}`;
      openUrl(addr)
    })
  }
}

module.exports = Server
