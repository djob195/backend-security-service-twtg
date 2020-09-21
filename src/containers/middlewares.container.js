const { asClass } = require('awilix');
const {HealthcheckMiddleware, InternationalizationMiddleware} = require("middlewares-twtg")
module.exports = function(container){
    container.register({
        HealthcheckMiddleware: asClass(HealthcheckMiddleware).singleton(),
        InternationalizationMiddleware: asClass(InternationalizationMiddleware).singleton()
    });
}