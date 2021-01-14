const { asClass } = require('awilix');
const { AuthenticationController, UserController,
    BranchController, ControllerController } = require("../controllers");
module.exports = function(container){
    container.register({
        AuthenticationController: asClass(AuthenticationController).singleton(),
        UserController: asClass(UserController).singleton(),
        BranchController: asClass(BranchController).singleton(),
        ControllerController: asClass(ControllerController).singleton()
    });
}