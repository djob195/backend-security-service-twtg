class ControllerController{
    constructor({ControllerService}){
        this.ControllerService = ControllerService;
    }

    async get (req, res, next){
        try {
            let id = req.params.id;
            let tmp = await this.ControllerService.get(id);  
            return res.status(201).json(tmp);           
        } catch (error) {
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }   
        }
    }

    async create (req, res, next){
        try {
            let tmp = await this.ControllerService.create(req.body);
            return res.status(201).json(tmp);    
        } catch (error) {
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }   
        }
    }
    async getAll(req, res, next){
        try {
            let limit = Number(req.query.limit) || 10;
            let skip = Number(req.query.skip) || 0;
            let tmp = await this.ControllerService.getAll(skip, limit);
            return res.status(201).json(tmp);    
        } catch (error) {
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }   
        }
    }

    async patch(req, res, next){
        try {
            let tmp = await this.ControllerService.patch(req.params.id, req.body);
            return res.status(201).json({message:"okay"});    
        } catch (error) {
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }   
        }
    }
    async login(req, res, next){
        try {
            let token = await this.ControllerService.login(req.body.uuid);
            return res.status(201).json({token}); 
        } catch (error) {
            console.log(error);
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }
        }
    }
}

module.exports = ControllerController;