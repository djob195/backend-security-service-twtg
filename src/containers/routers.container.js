const { asFunction } = require('awilix');
const { AuthenticationRouter, UserRouter } = require("../routers");
module.exports = function(container){
    container.register({
        AuthenticationRouter: asFunction(AuthenticationRouter).singleton(),
        UserRouter: asFunction(UserRouter).singleton()
    });
}