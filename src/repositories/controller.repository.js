
class ControllerRepository {
    constructor({twtOdm, adminfb}){
        this.adminfb = adminfb;
        this.twtOdm = twtOdm;
    }
    async updatePassword(uid, password){
        const db = this.adminfb.firestore();
        let doc = db.collection('controllers').doc(uid);
        await this.adminfb.auth().updateUser(uid,{
            password
        });
        await doc.update({isFirstTime:false});
    }

    async forgotPassword(email){
        try {
            const cryptoRandomString = require('crypto-random-string');
            let password = cryptoRandomString({length: 16, type: 'alphanumeric'});
            let user = await this.adminfb.auth().getUserByEmail(email);
            await this.adminfb.auth().updateUser(user.uid,{
                password
            });
            const db = this.adminfb.firestore();
            let doc = db.collection('controllers').doc(user.uid);
            await doc.update({isFirstTime:true});
            return {uid: user.uid, password};
        } catch (error) {
            console.log(error);
            let err = new Error();
            throw err;
        }
    }

    async createAuth(email){
        let user = null;
        let password = null;
        try {
            const cryptoRandomString = require('crypto-random-string');
            password = cryptoRandomString({length: 16, type: 'alphanumeric'});
            user = await this.adminfb.auth().createUser({
                email: email,
                emailVerified: false,
                password: password,
                disabled: false
              });
        } catch (error) {
            console.log(error)
            let err = new Error("");
            throw new err;
        }
        return {uid: user.uid, password};
    }
    async login (uid){
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
        return tmp;
    }
    async create (controller){
        const db = this.adminfb.firestore();
        const controllerModel = new this.twtOdm.db.ControllerModel(controller);
        let demo = null;
        try {
            // demo = await controllerModel.save();   
            let doc = db.collection('controllers').doc(controller.uid);
            delete controller.uid;
            controller.isFirstTime = true;
            controller = {...controller, /*mongoId: demo.id*/};
            await doc.set(controller);
        } catch (error) {
            console.log(error)
            if(error.code == 11000){
                let error = new Error("errors.authentication.e2");
                error.code = 409;
                throw error;                
            }
        }
        return demo;
    }
    
    async getAll(skip, limit){
        let data = await this.twtOdm.db.ControllerModel
        .find({})
        .sort({createdAt: 1})
        .limit(limit)
        .skip(skip)
        .exec();
        let count = await this.twtOdm.db.ControllerModel
        .countDocuments({});
        return {data, pagination:{total:count, offset:skip, limit}}
    }
    
    async get(controllerId){
        let data = await this.twtOdm.db.ControllerModel.findById(controllerId);
        if(data == null){
            let error = new Error("errors.authentication.e1");
            error.code = 400;
            throw error;
        }
        return data;
    }
    async getByUid(uid){
        let data = await this.twtOdm.db.ControllerModel.find({uid}).exec();
        if(data == null){
            let error = new Error("errors.authentication.e1");
            error.code = 400;
            throw error;
        }
        return data;
    }
    async patch(controllerId, controller){
        let uid = controller.uid;
        delete controller.uid;
        let data = await this.twtOdm.db.ControllerModel.findByIdAndUpdate(controllerId, controller, {new: true});
        if(data == null){
            let error = new Error("errors.authentication.e1");
            error.code = 400;
            throw error;
        }
        data = {
            mongoId: data._id.toString(),
            lastName: data.lastName,
            firstName: data.firstName,
            role: data.role
        }
        const db = this.adminfb.firestore();
        let controllerRef = db.collection("controllers").doc(uid);
        let _controller = await controllerRef.get();
        _controller = await _controller.data();
        if(_controller!=undefined){
            if(controller.active == false){
                await this.adminfb.auth().updateUser(uid,{
                    disabled:true
                });
                await controllerRef.delete();
            }else{
                await controllerRef.update(data);
            }
        }else{
            if(controller.active == true){
                await this.adminfb.auth().updateUser(uid,{
                    disabled:false
                });
                await controllerRef.set(data);
            }
        }
    }
}

module.exports = ControllerRepository;
