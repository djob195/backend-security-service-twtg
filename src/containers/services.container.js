const { asClass } = require('awilix');
const { AuthenticationService } = require("../services");

module.exports = function(container){
    container.register({
        AuthenticationService: asClass(AuthenticationService).singleton()
    });
}