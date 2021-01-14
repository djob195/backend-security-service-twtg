class ControllerRepository {
    constructor({twtOdm, adminfb}){
        this.adminfb = adminfb;
        this.twtOdm = twtOdm;
    }
    async login (uid){
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
            demo = await controllerModel.save();   
            let doc = db.collection('controllers').doc(controller.uid);
            delete controller.uid;
            controller = {...controller, mongoId: demo.id};
            await doc.set(controller);
        } catch (error) {
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
        let trya = await this.twtOdm.db.ControllerModel.findOne({_id:controllerId}).exec();
        console.log(trya._id.toString());    
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
                await controllerRef.delete();
            }else{
                await controllerRef.update(data);
            }
        }else{
            if(controller.active == true){
                await controllerRef.set(data);
            }
        }
    }
}

module.exports = ControllerRepository;
