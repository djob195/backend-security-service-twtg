const {loginMapping, userMapping} = require("./mappings");
const jwt = require("jsonwebtoken");
const {JwtConfig} = require("configs-twtg");


class AuthenticationService{
    constructor({ AuthenticationRepository }){
        this.AuthenticationRepository = AuthenticationRepository;
    }

    async getByUid(uid){
        let data =  await this.AuthenticationRepository.getByUid(uid);
        return await userMapping(data);
    }

    async create(idToken){
        let user = {};
        await this.AuthenticationRepository.create(idToken,user);
    }

    async login(idToken){
        const result = await this.AuthenticationRepository.login(idToken);
        const user =  loginMapping(result);
        let date = Date.now();
        let ormUser = await this.getByUid(user.user_id);
        let claims = null;
        try {
            claims = {
                firstName: ormUser.firstName,
                lastName: ormUser.lastName,
                biker: ormUser.agente,
                company: ormUser.company,
                companyId: ormUser.companyId,
                branchOfficeId: ormUser.branchOfficeId,
                branchOffice: ormUser.branchOffice,
            }
        } catch (error) {
            error.code = 400;
            throw error;
        }
        const token = await jwt.sign({
            iss: JwtConfig.serviceAccountEmail,
            sub: JwtConfig.serviceAccountEmail,
            aud: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
            iat: date,
            exp: date +  JwtConfig.expTime,
            uid: user.uid,
            claims
        }, JwtConfig.secret);
        return {token};
    }
}
module.exports = AuthenticationService;
