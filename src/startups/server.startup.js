const express = require('express');
const {ApiConfig} = require("configs-twtg");

class Server {

    constructor({ RouterStartup }) {
      this.express = express().use(RouterStartup);
      this.express.disable('x-powered-by');
      this.server = null;
    }
  
    start() {
      return new Promise(resolve => {
        this.server = this.express.listen(ApiConfig.port, () => {
          console.log(`services security running on port ${ApiConfig.port}`);
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