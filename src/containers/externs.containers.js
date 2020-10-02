const { asValue } = require('awilix');
const {FirebaseConfig } = require("configs-twtg");
const  TwtgOdm  = require("odm-twtg");
const admin = require("firebase-admin");

const twtOdm = new TwtgOdm();
twtOdm.connect();
admin.initializeApp({
    credential: admin.credential.cert(FirebaseConfig.credential),
    databaseURL: FirebaseConfig.databaseURL
});
  
module.exports = function(container){
    container.register({
        adminfb: asValue(admin),
        twtOdm: asValue(twtOdm)
    });
}