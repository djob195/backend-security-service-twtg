const { asValue } = require('awilix');
const {FirebaseConfig } = require("configs-twtg");
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(FirebaseConfig.credential),
    databaseURL: FirebaseConfig.databaseURL
});
  
module.exports = function(container){
    container.register({
        adminfb: asValue(admin)
    });
}