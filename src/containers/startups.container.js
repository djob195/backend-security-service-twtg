const { asClass, asFunction } = require('awilix');
const { RouterStartup, ServerStartup} = require("../startups");
module.exports = function(container){
    container.register({
        RouterStartup: asFunction(RouterStartup).singleton(),
        ServerStartup: asClass(ServerStartup).singleton(),
    });
}