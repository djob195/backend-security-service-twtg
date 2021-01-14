const {controllerMapping} = require("./mappings");
const jwt = require("jsonwebtoken");
const {JwtConfig} = require("configs-twtg");

class ControllerService{
    constructor({ ControllerRepository }){
        this.ControllerRepository = ControllerRepository;
    }
    async get(controllerId){
        let cont = await this.ControllerRepository.get(controllerId);
        return controllerMapping(cont);
    }
    async create(controller){
        let _controller = await this.ControllerRepository.create(controller);
        return controllerMapping(_controller);
    }
    async getAll(skip, limit){
        let conts = await this.ControllerRepository.getAll(skip, limit);
        conts.data = conts.data.map((e)=>controllerMapping(e))
        return conts;
    }
    async patch(controllerId, controller){
        await this.ControllerRepository.patch(controllerId, controller);
    }
    async login(uid){
        let tmp = await this.ControllerRepository.login(uid);
        let tmpMongo = await this.ControllerRepository.getByUid(tmp.user_id);
        let claims = null;
        try {
            claims = {
                firstName: tmpMongo.firstName,
                lastName: tmpMongo.lastName,
                biker: tmpMongo.uid,
                companyId: tmpMongo.companyId,
                branchOfficeId: tmpMongo.branchOfficeId,
            }
        } catch (error) {
            error.code = 400;
            throw error;
        }
        let date = Date.now();
        let token = null;
        try {
            token = await jwt.sign({
                iss: JwtConfig.serviceAccountEmail,
                sub: JwtConfig.serviceAccountEmail,
                aud: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
                iat: date,
                exp: date +  JwtConfig.expTime,
                uid: uid,
                claims
            }, JwtConfig.secret);
        } catch (error) {   
            console.log(error);
        }
        return token;
    }
}
module.exports = ControllerService;
