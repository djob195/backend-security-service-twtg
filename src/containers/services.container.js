const { asClass } = require('awilix');
const { AuthenticationService, UserService, BranchService } = require("../services");

module.exports = function(container){
    container.register({
        AuthenticationService: asClass(AuthenticationService).singleton(),
        UserService: asClass(UserService).singleton(),
        BranchService: asClass(BranchService).singleton()
    });
}