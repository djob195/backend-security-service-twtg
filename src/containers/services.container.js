const { asClass } = require('awilix');
const { AuthenticationService, UserService } = require("../services");

module.exports = function(container){
    container.register({
        AuthenticationService: asClass(AuthenticationService).singleton(),
        UserService: asClass(UserService).singleton()
    });
}