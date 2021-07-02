const objectMapper = require('object-mapper');

module.exports = (entity) =>{
    const map = {
        'id':'id',
        'uid':'uid',
        'firstName':'firstName',
        'lastName': 'lastName',
        'agente': 'agente',
        'company': 'company',
        'companyId': 'companyId',
        'branchOffice': 'branchOffice',
        'branchOfficeId': 'branchOfficeId',
        'available': 'available',
        'status': 'status',
        'transportId': 'transportId'
    }
    return objectMapper(entity, map);
}
