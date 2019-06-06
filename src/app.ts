'use strict';
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
import { logger } from '@shared/services/logger';
import appRoutes from './routes/routes';
import { MongoService } from '@shared/services/mongodb/mongo.service';
const jwt = require('./shared/services/jwt');
const errorHandler = require('./shared/errorHandler');
const public_path = 'public';
const port = process.env.port || 3006;
const getRoutes = () => {
  for (let route of appRoutes) {
    app.use(route.path, route.router);
    logger.info(`route ${route.path} loaded`);
  }
}

export default class App {
  constructor() {
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())
    app.use(express.static(public_path));

    app.use(function (req, res, next) {
      //TODO: allow only origins and headers necessary
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

   // app.use(jwt());
    app.use(errorHandler);
  //  app.use(new UserActions().isEnabled);
    getRoutes();
    app.listen(port, () => logger.info(`App listening on port ${port}`));
    //Just test the mongodb connection
    // new MongoService().getAutoReleasedDb((() => {
    //   logger.info('Mongo connection test succeded');
    // }));
  }
}
