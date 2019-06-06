'use strict';
import 'module-alias/register';
import App from './app';
process.on('unhandledRejection', (reason, promise) => {
    console.log("UNHANDLED_REJECTION at Promise", promise, " at ", reason);
});

process.on('uncaughtException', (err) => {
    console.log("UNCAUGHT_EXCEPTION", err);
});

new App();