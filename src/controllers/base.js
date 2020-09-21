class BaseController {
  
    constructor(EntityService) {
      this.EntityService = EntityService;
    }
    
    async getAll(req, res, next) {
      try{
        const entities = await this.EntityService.getAll();
        return res.status(201).json(entities);
      }catch(error){
        return next({status: 500, message: error.message});
      }
    }
    
    async get(req, res, next) {
      try{
        const entity = await this.EntityService.get(req.params.id);
        return res.status(201).json(entity);
      }catch(error){
        if (error.message === 'E-NOTFOUND') {
          return res.status(404).send({message:"Register does not found"});
        } else{
          return next({status: 500, message: error.message});
        }
      }
    }
    
    async create(req, res, next) {
      try{
        await this.EntityService.create(req.body);
        return res.status(201).json({message:'okay'});
      }catch(error){
        console.log(error);
        return next({status: 500, message: error.message});
      }
    }
    
    async update(req, res, next) {
      try{
        await this.EntityService.update(req.params.id, req.body);
        return res.status(201).json({message:'okay'});
      }catch(error){
        if (error.message === 'E-NOTFOUND') {
            return res.status(404).send({message:"Register does not found"});
        } else{
          return next({status: 500, message: error.message});;
        }   
      }
    }
    
    async delete(req, res, next) {
      try{
        await this.EntityService.delete(req.params.id);
        return res.status(201).json({message:'okay'});
      }catch(error){
        if (error.message === 'E-NOTFOUND') {
            return res.status(404).send({message:"Register does not found"});
        } else{
          return next({status: 500, message: error.message});
        }    
      }
    }
  }
    
  module.exports = BaseController;
  