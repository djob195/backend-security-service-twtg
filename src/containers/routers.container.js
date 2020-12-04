const { asFunction } = require('awilix');
const { AuthenticationRouter, UserRouter, BranchRouter } = require("../routers");
module.exports = function(container){
    container.register({
        AuthenticationRouter: asFunction(AuthenticationRouter).singleton(),
        UserRouter: asFunction(UserRouter).singleton(),
        BranchRouter: asFunction(BranchRouter).singleton()
    });
}