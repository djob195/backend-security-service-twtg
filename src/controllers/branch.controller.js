class BranchController{
    constructor(){

    }

    async loginBranch(req, res, next){
        try {
            return res.status(201).json({companyId:"88c8334b-6915-48af-8189-22375d591ed7", branchId:"0f9f49ad-f8f7-47d1-b424-d16010289659", token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"}); 
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