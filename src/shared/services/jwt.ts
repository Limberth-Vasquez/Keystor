const expressJwt = require('express-jwt');
import environment from '@environment/environment';

module.exports = jwt;
function jwt() {
    return expressJwt({ secret: environment.jwtSecret }).unless({
        path: [
            // public routes that don't require authentication
            //'/users/authenticate'
        ]
    });
}