let log4js = require('log4js');
let logger1 = log4js.getLogger();
logger1.level = 'debug';
export const logger: {
    info: Function,
    error: Function
} = logger1;