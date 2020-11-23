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

    async create(idToken, user){
        let tmp = await this.adminfb.auth().verifyIdToken(idToken);
        user.uid = tmp.user_id;
        let nameTmp = tmp.name || "sin-nombre sin-apellido";
        nameTmp = nameTmp.split(" ");
        user.firstName =  (nameTmp[0]==undefined) ? "sin nombre": nameTmp[0];
        user.lastName = (nameTmp[1]==undefined) ? "sin apellido": nameTmp[1];
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
        let tmp = await this.adminfb.auth().verifyIdToken(uid); 
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
        /*const db = this.adminfb.firestore();
        let fbUser = await db.collection('bikers')
        .doc(tmp.user_id);
        fbUser = await fbUser.get();
        fbUser = getUser.data();
        if(fbUser.type == "AVAILABLE"){
            let error = new Error("errors.authentication.e3");
            error.code = 401;
            throw error;
        }*/
        await db.collection('bikers')
        .doc(tmp.user_id).update({
            "pushToken": pushToken
        });
        return tmp;
    }
}

module.exports = AuthenticationRepository;
