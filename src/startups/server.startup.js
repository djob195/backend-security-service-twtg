const express = require('express');
const {ApiConfig} = require("configs-twtg");

class Server {

    constructor({ RouterStartup }) {
      const router = express.Router();
      router.use(ApiConfig.security.path, RouterStartup);
      this.express = express().use(router);
      this.express.disable('x-powered-by');
      this.server = null;
    }
  
    start() {
      return new Promise(resolve => {
        this.server = this.express.listen(ApiConfig.security.port, () => {
          console.log(`services security running on port ${ApiConfig.security.port}`);
          resolve();
        });
      });
    }
  
    stop() {
      return new Promise(resolve => {
        this.server.close(() =>{
          console.log('server turned off');
          resolve();
        });
      });
    }
}
  
module.exports = Server;