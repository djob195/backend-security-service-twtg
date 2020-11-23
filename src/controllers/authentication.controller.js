class AuthenticationController{
    constructor({ AuthenticationService }){
        this.AuthenticationService = AuthenticationService;
    }

    async refresh (req, res, next){
        try {
            const result = await this.AuthenticationService.refresh(req.tokenJwt.uid);
            return res.status(201).json(result);
        } catch (error) {
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }
        }
    }

    async login(req, res, next){
        const idToken = req.body.idToken;
        const pushToken = req.query.pushToken;
        try {
            const result = await this.AuthenticationService.login(idToken, pushToken);
            return res.status(201).json(result);
        } catch (error) {
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }
        }
    }

    async post(req, res, next){
        try {
            const pushToken = req.query.pushToken || null;
             await this.AuthenticationService.create(req.body.idToken, pushToken);
            return res.status(201).json({message: "user was created"});
        } catch (error) {
            console.log({error});
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }
        }
    }
}

module.exports = AuthenticationController;