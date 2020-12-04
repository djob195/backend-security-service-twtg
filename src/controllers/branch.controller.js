class BranchController{
    constructor({BranchService}){
        this.BranchService = BranchService;
    }

    async loginBranch(req, res, next){
        try {
            let token = await this.BranchService.login(req.body.uuid);
            return res.status(201).json({token, uuid:req.body.uuid}); 
        } catch (error) {
            if(error.code){
                return next({code: error.code, message: error.message});
            }else{
                return next({code: 500});
            }
        }
    }
}

module.exports = BranchController;