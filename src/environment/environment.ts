const env = process.env.NODE_ENV;
import * as dev from './environment.dev';
import * as prod from './environment.prod';
export interface IEnvironment {
    mongoUrl,
    jwtSecret
}//method
let environment: IEnvironment;
const getFile = () => {
    switch (env) {
        case 'dev':
            environment = dev;
        case 'prod':
            environment = prod;
        default:
            environment = dev;
    }
}

getFile();

export default environment;