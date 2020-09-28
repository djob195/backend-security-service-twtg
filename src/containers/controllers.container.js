const { asClass } = require('awilix');
const { AuthenticationController } = require("../controllers");
module.exports = function(container){
    container.register({
        AuthenticationController: asClass(AuthenticationController).singleton(),
    });
}