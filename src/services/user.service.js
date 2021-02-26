const {userMapping} = require("./mappings");

class UserService{
    constructor({ UserRepository }){
        this.UserRepository = UserRepository;
    }
    async getAvailableBikers(branchId){
        return await this.UserRepository.getAvailableBikers(branchId);
    }
    async updateState(userId, type, companyId, branchId){
        await this.UserRepository.updateState(userId, type, companyId, branchId);
    }
    async patch(userId, body, uid){
        await this.UserRepository.patch(userId, body, uid);
    }
    async get(userId){
        let data = await this.UserRepository.get(userId);
        return await userMapping(data);
    }
    async getAll(skip, limit, status){
        let tmp = await this.UserRepository.getAll(skip, limit, status);
        tmp.data = tmp.data.map((_data) => userMapping(_data));
        return tmp;
    }
}
module.exports = UserService;
