class AuthenticationController{
    constructor({ AuthenticationService }){
        this.AuthenticationService = AuthenticationService;
    }

    async login(req, res, next){
        const idToken = req.body.idToken;
        try {
            const result = await this.AuthenticationService.login(idToken);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = AuthenticationController;