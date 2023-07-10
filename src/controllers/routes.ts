import express from 'express';

import customersControllers from './customers.controller';

function routerApi(app: express.Application){
  // const router = express.Router();
  app.use('', customersControllers);
}

export { routerApi };