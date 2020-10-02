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
        const userModel = new this.twtOdm.db.UserModel(user);
        let demo = await userModel.save();
        return demo;
    }

    async login(idToken){
        return await this.adminfb.auth().verifyIdToken(idToken);  
    }
}

module.exports = AuthenticationRepository;