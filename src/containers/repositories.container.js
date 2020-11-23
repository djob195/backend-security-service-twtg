const { asClass } = require('awilix');
const { AuthenticationRepository, UserRepository } = require("../repositories");
module.exports = function(container){
    container.register({
        AuthenticationRepository: asClass(AuthenticationRepository).singleton(),
        UserRepository: asClass(UserRepository).singleton()
    });
}