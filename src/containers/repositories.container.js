const { asClass } = require('awilix');
const { AuthenticationRepository, UserRepository, ControllerRepository } = require("../repositories");
module.exports = function(container){
    container.register({
        AuthenticationRepository: asClass(AuthenticationRepository).singleton(),
        UserRepository: asClass(UserRepository).singleton(),
        ControllerRepository: asClass(ControllerRepository).singleton()
    });
}