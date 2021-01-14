const { asClass } = require('awilix');
const { AuthenticationService, UserService, BranchService, ControllerService } = require("../services");

module.exports = function(container){
    container.register({
        AuthenticationService: asClass(AuthenticationService).singleton(),
        UserService: asClass(UserService).singleton(),
        BranchService: asClass(BranchService).singleton(),
        ControllerService: asClass(ControllerService).singleton()
    });
}