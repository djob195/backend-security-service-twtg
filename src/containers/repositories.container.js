const { asClass } = require('awilix');
const { AuthenticationRepository } = require("../repositories");
module.exports = function(container){
    container.register({
        AuthenticationRepository: asClass(AuthenticationRepository).singleton(),
    });
}