const { getUser } = require("../routers/validators/user.validator");

class AuthenticationRepository {
    constructor({adminfb, twtOdm}){
        this.adminfb = adminfb;
        this.twtOdm = twtOdm;
    }

    async getByUid(uid){
        const UserModel = this.twtOdm.db.UserModel;
        let data =  await UserModel.find({uid});
        return data;
    }
    
    async delete(uid){
        await this.adminfb.auth().deleteUser(uid);
        await this.twtOdm.db.UserModel.deleteOne({uid});
    }

    async create(idToken, user){
        let tmp = null;
        try {
            tmp = await this.adminfb.auth().verifyIdToken(idToken);
        } catch (errorAuth) {
            let error = null;
            switch (errorAuth.code) {
                case "auth/id-token-expired":{
                    error = new Error("errors.authentication.e4");
                    error.code = 409;
                    break;
                }
                case "auth/id-token-revoked":{
                    error = new Error("errors.authentication.e5");
                    error.code = 409;
                    break;
                }
                default:{
                    error = new Error(errorAuth.message);
                    error.code = 500;
                    break;
                }
            }
            throw error;
        }
        user.uid = tmp.user_id;
        let nameTmp = tmp.name || "NOMBRE APELLIDO";
        nameTmp = nameTmp.split(" ");
        user.firstName =  (nameTmp[0]==undefined) ? "SIN NOMBRE": nameTmp[0].toUpperCase();;
        user.lastName = (nameTmp[1]==undefined) ? "SIN APELLIDO": nameTmp[1].toUpperCase();;
        const userModel = new this.twtOdm.db.UserModel(user);
        let demo = null;
        try {
            demo = await userModel.save();   
        } catch (error) {
            if(error.code == 11000){
                let error = new Error("errors.authentication.e2");
                error.code = 409;
                throw error;                
            }
        }
        return demo;
    }

    async login(uid, pushToken){
        let tmp = null;
        try {
            tmp = await this.adminfb.auth().verifyIdToken(uid); 
        } catch (errorAuth) {
            let error = null;
            switch (errorAuth.code) {
                case "auth/id-token-expired":{
                    error = new Error("errors.authentication.e4");
                    error.code = 409;
                    break;
                }
                case "auth/id-token-revoked":{
                    error = new Error("errors.authentication.e5");
                    error.code = 409;
                    break;
                }
                default:{
                    error = new Error(errorAuth.message);
                    error.code = 500;
                    break;
                }
            }
            throw error;
        }
        let data =  await this.twtOdm.db.UserModel.findOneAndUpdate({uid:tmp.uid}, {pushToken});
        if(data == undefined){
            let error = new Error("errors.authentication.e1");
            error.code = 400;
            throw error;
        }
        if(data.status != "ACTIVE"){
            let error = new Error("errors.authentication.e2");
            error.code = 401;
            throw error;
        }
        const db = this.adminfb.firestore();
        let fbUser = await db.collection('bikers')
        .doc(tmp.user_id);
        fbUser = await fbUser.get();
        fbUser = fbUser.data();
        if(fbUser.type == "AVAILABLE"){
            let error = new Error("errors.authentication.e3");
            error.code = 401;
            throw error;
        }
        await db.collection('bikers')
        .doc(tmp.user_id).update({
            "pushToken": pushToken
        });
        return tmp;
    }
}

module.exports = AuthenticationRepository;
