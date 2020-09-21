const { asClass } = require('awilix');
const healthcheckPath = require('../swagger/paths/healthcheck.path');
module.exports = function(container){
    container.register({
        HealtCheckMiddleware: asClass(HealtCheckMiddleware).singleton()
    });
}