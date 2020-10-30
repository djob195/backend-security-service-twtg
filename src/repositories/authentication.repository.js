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
        let actualPosition =  await new this.adminfb.firestore.GeoPoint(14,0);
        const db = this.adminfb.firestore();
        await db.collection('bikers')
       .doc(tmp.user_id).set({
           "phone":"55555555",
           "actualPosition":actualPosition,
           "name": tmp.name,
           "disponibility":"Avaliable",
           "company":"Delivery Lab",
           "companyId":"DL2020",
           "SUCURSAL":"Sucursal del Delivery Lab",
           "branchId":"DELIVERYLAB2020"
       });
        user.uid = tmp.user_id;
        user.firstName =  tmp.name;
        user.lastName = tmp.name;
        user.agente = tmp.user_id;
        user.company = "Delivery Lab";
        user.companyId ="DL2020";
        user.branchOfficeId = "Sucursal del Delivery Lab";
        user.branchOffice = "DELIVERYLAB2020";
        const userModel = new this.twtOdm.db.UserModel(user);
        let demo = await userModel.save();
        return demo;
    }

    async login(idToken){
        return await this.adminfb.auth().verifyIdToken(idToken);  
    }
}

module.exports = AuthenticationRepository;
