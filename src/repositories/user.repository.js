const _notifyBiker = async(token)=>{
    try {
        const fcm = this.adminfb.messaging();
        const payload=this.adminfb.messaging.messaginPayload={
            notification:{
              body:`Tu proceso de inscripción se ha completado`,
              title:`¡Autenticación autorizada!`,
                icon:'https://firebasestorage.googleapis.com/v0/b/twgpb-a8c88.appspot.com/o/assets%2Fic_launcher.png?alt=media&token=c972ec21-2c6d-4bbe-b751-7e5e42132d65',
                click_action:'FLUTTER_AUTHENTICATION_CLICK'
            }
        }   
        await fcm.sendToDevice(token,payload);
    } catch (error) {
        console.log("Error al enviar la notificación")     
    }
}

class UserRepository {
    constructor({twtOdm, adminfb}){
        this.adminfb = adminfb;
        this.twtOdm = twtOdm;
    }
    
    async getAvailableBikers(branchId){
        const db = this.adminfb.firestore();
        let bikers = db.collection("bikers");
        let bikers2 = db.collection("bikers");
        let wilcardDeliveries = await bikers
        .where("type","==", "WILDCARD").get();
        let tmpData = [];
        wilcardDeliveries.forEach((e)=>{
            let tmp =e.data();
            delete tmp.actualResume;
            tmpData.push({...tmp, id: e.id})})
        let tmpData2 = [];
        if(branchId){
            let assignedDeliveries = await bikers2.where("branchId", "==", branchId).get();
            assignedDeliveries.forEach((e)=>{
                let tmp =e.data();
                delete tmp.actualResume;
                tmpData2.push({...tmp,id:e.id})})
        }
        return tmpData.concat(tmpData2);
    }

    async updateState(userId, type, companyId, branchId){
        let user = {
            type
        };
        const db = this.adminfb.firestore();
        let biker = await db.collection('bikers').doc(userId).get();
        biker = await biker.data();
        let size = biker.counters["Pendiente"] +  biker.counters["En ruta"] + biker.counters["En cola"] + biker.counters["Aceptado"]; 
        if(size != 0){
            let error = new Error("errors.users.e4");
            error.code = 409;
            throw error;  
        }
        let tmpUser =  await this.twtOdm.db.UserModel.findOne({uid:userId}).exec();
        user = {
            ...user,
            "pushToken": tmpUser.pushToken
        }
        if(type == "PERMANENT"){
            let branch = await db.collection('branches').doc(branchId).get();
            if (!branch.exists)
            {
                let error = new Error("errors.users.e3");
                error.code = 409;
                throw error;     
            }
            let branchData = await branch.data();
            user = {
                ...user,
                "company": branchData.company,
                "companyId": branchData.companyId,
                "SUCURSAL": branchData.name,
                "branchId": branch.id
            };
        }else{
            user = {
                ...user,
                "company": null,
                "companyId": null,
                "SUCURSAL": null,
                "branchId": null
            };
        }
        if(type != "AVAILABLE"){
            _notifyBiker(tmpUser.pushToken); 
        }
        await db.collection('bikers').doc(userId).update(user);
    }   

    async patch(userId,user, uid){
        const db = this.adminfb.firestore();
        let doc = db.collection('bikers').doc(uid);
        if(user.status != "AVAILABLE"){
            let _user = await doc.get();
            if(_user.exists){
                _user = _user.data();
                if(_user.type != "AVAILABLE"){
                    let error = new Error("errors.users.e1");
                    error.code = 409;
                    throw error;
                }
            }
        }
        let data = await this.twtOdm.db.UserModel.findByIdAndUpdate(userId, user, {new: true});
        if(data == null){
            let error = new Error("errors.authentication.e1");
            error.code = 400;
            throw error;
        };
        if(user.status == "ACTIVE"){
            let actualPosition =  await new this.adminfb.firestore.GeoPoint(14,0);
            let biker = {
                "actualPosition": actualPosition,
                "name": `${data.firstName} ${data.lastName}`,
                "phone":  (data.phone == undefined) ? "sin telefono" : data.phone,
                "type": "AVAILABLE"
            }
            let _tmp = await doc.get();
            if(!_tmp.exists){
                biker = {...biker,
                    "counters":{
                        'Entregado':0,
                        'Cancelado':0,
                        'En ruta':0,
                        'Pendiente':0,
                        'En cola':0,
                        'Aceptado':0
                    }                
                }
                await doc.set(biker);  
            }
            else
                await doc.update(biker);
        } else if (data.status != "ACTIVE"){
            await doc.delete();
        }
    }

    async get(userId){
        let data = await this.twtOdm.db.UserModel.findById(userId);
        if(data == null){
            let error = new Error("errors.authentication.e1");
            error.code = 400;
            throw error;
        }
        return data;
    }

    async getAll(skip, limit, status){
        let data = await this.twtOdm.db.UserModel
        .find({status})
        .sort({createdAt: 1})
        .limit(limit)
        .skip(skip)
        .exec();
        let count = await this.twtOdm.db.UserModel
        .countDocuments({status});
        return {data, pagination:{total:count, offset:skip, limit}}
    }
}

module.exports = UserRepository;