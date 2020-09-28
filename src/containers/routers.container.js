const { asFunction } = require('awilix');
const { AuthenticationRouter } = require("../routers");
module.exports = function(container){
    container.register({
        AuthenticationRouter: asFunction(AuthenticationRouter).singleton(),
    });
}