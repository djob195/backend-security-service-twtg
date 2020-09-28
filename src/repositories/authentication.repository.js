class AuthenticationRepository {
    constructor({adminfb}){
        this.adminfb = adminfb;
    }

    async login(idToken){
        return await this.adminfb.auth().verifyIdToken(idToken);
    }
}

module.exports = AuthenticationRepository;