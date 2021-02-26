class UserController{
    constructor({ UserService }){
        this.UserService = UserService;
    }

    async deleteBikers(req,res,next){
     try {
            let uid = req.params.uid;
            let data = await this.UserService.getAvailableBikers(uid);
            return res.status(201).json({message:"user reseteado"}); 
        } catch (error) {
            console.log(error);
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }
        }
    }
    
    async getAvailableBikers(req, res, next){
        try {
            let branchId = req.query.branchId;
            let data = await this.UserService.getAvailableBikers(branchId);
            return res.status(201).json({data}); 
        } catch (error) {
            console.log(error);
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }
        }
    }

    async updateState(req, res, next){
        try {
            let userId = req.params.userId;
            let type = req.params.type;
            let companyId = req.query.companyId;
            let branchId = req.query.branchId;
            await this.UserService.updateState(userId, type, companyId, branchId);
            return res.status(201).json({message: "okay"}); 
        } catch (error) {
            console.log(error);
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }
        }
    }

    async patch(req, res, next){
        try {
            let userId = req.params.userId;
            let uid = req.params.uid;
            await this.UserService.patch(userId, req.body, uid);
            return res.status(201).json({message: "okay"});
        } catch (error) {
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }
        }
    }

    async get(req, res, next){
        try {
            let userId = req.params.userId;
            const result = await this.UserService.get(userId);
            return res.status(201).json(result);
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
            let skip = Number(req.query.skip) || 0;
            let limit = Number(req.query.limit) || 5;
            let status = req.query.status;
            const result = await this.UserService.getAll(skip, limit, status);
            return res.status(201).json(result);
        } catch (error) {
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }
        }
    }
}

module.exports = UserController;
