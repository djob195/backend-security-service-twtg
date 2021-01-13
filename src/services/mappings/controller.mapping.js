const objectMapper = require('object-mapper');

module.exports = (entity) =>{
    const map = {
        'uid':'uid',
        'firstName':'firstName',
        'lastName': 'lastName',
        'companyId': 'companyId',
        'branchOfficeId': 'branchOfficeId',
        'active': 'active',
        'role': 'role'
    }
    return objectMapper(entity, map);
}