class BranchController{
    constructor(){
        
    }

    async loginBranch(req, res, next){
        try {
            return res.status(201).json({companyId:"", branchId:"", token:""}); 
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