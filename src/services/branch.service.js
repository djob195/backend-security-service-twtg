const jwt = require("jsonwebtoken");
const {JwtConfig} = require("configs-twtg");

class BranchService{
    constructor(){

    }
    async login(uid){
        let claims = null;
        try {
            claims = {
                firstName: "CONTROLADOR",
                lastName: "MRB",
                biker: "c1Y2XSbTUFPYcIDwNKaxJuGmDZl1",
                company: "CBC",
                companyId: "8e632828-dcda-4853-9660-f82af914238f",
                branchOfficeId: "9de2e757-cfa1-4dd3-810b-6e5cc091d978",
                branchOffice: "SUCURSAL PRINCIPAL",
                circle:{
                    ref:[
                        {
                            id:1,
                            distance: 7.5,
                            min:0,
                            max:7.5
                        },
                        {
                            id:2,
                            distance: 14.5,
                            min:7.5,
                            max:14.5
                        },
                        {
                            id:3,
                            distance: 20.5,
                            min:14.5,
                            max:20.5
                        },
                        {
                            id:4,
                            distance: 30.5,
                            min:20.5,
                            max:30.5
                        },
                        {
                            id:5,
                            distance: 30.5,
                            min:30.5,
                            max: Number.MAX_SAFE_INTEGER
                        }
                    ]
                }
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
        return {token};
    }
}
module.exports = BranchService;
