const { asClass } = require('awilix');
const { AuthenticationController, UserController } = require("../controllers");
module.exports = function(container){
    container.register({
        AuthenticationController: asClass(AuthenticationController).singleton(),
        UserController: asClass(UserController).singleton()
    });
}