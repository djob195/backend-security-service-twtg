class AuthenticationController{
    constructor({ AuthenticationService }){
        this.AuthenticationService = AuthenticationService;
    }


    async get(req, res, next){
        const id = req.params.id;
        try {
            const result = await this.AuthenticationService.getByUid(id);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async login(req, res, next){
        const idToken = req.body.idToken;
        try {
            const result = await this.AuthenticationService.login(idToken);
            return res.status(201).json(result);
        } catch (error) {
            if(error.code){
                return res.status(404).json({message: "El usuario no está creado en el sistema"});
            }else{
                return res.status(500).json({message: error.message});
            }
        }
    }

    async post(req, res, next){
        try {
            const result = await this.AuthenticationService.create(req.body.idToken);
            return res.status(201).json({message: "user was created"});
        } catch (error) {
            if(error.code){
                console.log(error);
                return res.status(400).json({message: "El usuario ya está creado"});
            }else{
                return res.status(500).json({message: error.message});
            }
        }
    }
}

module.exports = AuthenticationController;