const objectMapper = require('object-mapper');

module.exports = (entity) =>{
    const map = {
        'iss:':'iss:',
        'aud':'aud',
        'auth_time': 'auth_time',
        'user_id': 'user_id',
        'sub': 'sub',
        'iat': 'iat',
        'exp': 'exp',
        'email': 'email',
        'email_verified': 'email_verified',
        'firebase': 'firebase',
        'uid': 'uid'
    }
    return objectMapper(entity, map);
}