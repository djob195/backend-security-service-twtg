const { asClass } = require('awilix');
const {HealthcheckMiddleware, InternationalizationMiddleware,
    ValidationMiddleware, JwtMiddleware, ErrorMiddleware} = require("middlewares-twtg")
module.exports = function(container){
    container.register({
        HealthcheckMiddleware: asClass(HealthcheckMiddleware).singleton(),
        InternationalizationMiddleware: asClass(InternationalizationMiddleware).singleton(),
        ValidationMiddleware: asClass(ValidationMiddleware).singleton(),
        JwtMiddleware:  asClass(JwtMiddleware).singleton(),
        ErrorMiddleware: asClass(ErrorMiddleware).singleton()
    });
}