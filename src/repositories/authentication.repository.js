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
           "company":"GL OFIBODEGAS",
           "companyId":"GL20200517",
           "SUCURSAL":"GL OFIBODEGAS",
           "branchId":"GLOFIBODEGAS20200517"
       });
        user.uid = tmp.user_id;
        user.firstName =  tmp.name;
        user.lastName = tmp.name;
        user.agente = tmp.user_id;
        user.company = "GL OFIBODEGAS";
        user.companyId ="GL20200517";
        user.branchOfficeId = "GL OFIBODEGAS";
        user.branchOffice = "GLOFIBODEGAS20200517";
        const userModel = new this.twtOdm.db.UserModel(user);
        let demo = await userModel.save();
        return demo;
    }

    async login(idToken){
        return await this.adminfb.auth().verifyIdToken(idToken);  
    }
}

module.exports = AuthenticationRepository;