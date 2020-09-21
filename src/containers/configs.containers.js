const { asValue } = require('awilix');
const { FirebaseConfig } = require("../configs");

module.exports = function(container){
    container.register({
        FirebaseConfig: asValue(FirebaseConfig),
    });
}