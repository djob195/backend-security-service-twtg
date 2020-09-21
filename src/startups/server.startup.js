const express = require('express');

class Server {

    constructor({ SiteConfig, RouterStartup }) {
      this.SiteConfig = SiteConfig;
      this.express = express().use(RouterStartup);
      this.express.disable('x-powered-by');
      this.server = null;
    }
  
    start() {
      return new Promise(resolve => {
        this.server = this.express.listen(this.SiteConfig.port, () => {
          console.log(`services security running on port ${this.SiteConfig.port}`);
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