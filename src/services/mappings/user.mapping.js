const objectMapper = require('object-mapper');

module.exports = (entity) =>{
    const map = {
        'uid':'uid',
        'firstName':'firstName',
        'lastName': 'lastName',
        'agente': 'agente',
        'company': 'company',
        'companyId': 'companyId',
        'branchOffice': 'branchOffice',
        'branchOfficeId': 'branchOfficeId'
    }
    return objectMapper(entity, map);
}