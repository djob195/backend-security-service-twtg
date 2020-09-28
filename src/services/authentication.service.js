const {loginMapping} = require("./mappings");
const jwt = require("jsonwebtoken");
const {JwtConfig} = require("configs-twtg");

class AuthenticationService{
    constructor({ AuthenticationRepository }){
        this.AuthenticationRepository = AuthenticationRepository;
    }

    async login(idToken){
        const result = await this.AuthenticationRepository.login(idToken);
        const user =  loginMapping(result);
        let date = Date.now();
        const token = await jwt.sign({
            iss: JwtConfig.serviceAccountEmail,
            sub: JwtConfig.serviceAccountEmail,
            aud: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
            iat: date,
            exp: date +  JwtConfig.expTime,
            uid: user.uid,
            claims: {"companyId":"123"}
        }, JwtConfig.secret);
        return {token};
        //token.claims[0].companyId
    }
}
module.exports = AuthenticationService;
