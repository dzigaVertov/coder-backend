import { Router } from 'express';
import * as productsController from '../controllers/productsController.js';
import { soloRol } from '../middlewares/autorizacion.js';

let apiProductsRouter = Router();
export default apiProductsRouter;

apiProductsRouter.get('/', productsController.getHandler);

apiProductsRouter.post('/', soloRol('admin'), productsController.postHandler);

apiProductsRouter.put('/:pid', soloRol('admin'), productsController.putHandler);

apiProductsRouter.delete('/:pid', soloRol('admin'), productsController.delHandler);

apiProductsRouter.get('/:pid', productsController.getPidHandler);

apiProductsRouter.post('/realTimeProducts', soloRol('admin'), productsController.postRealTimeProducts);
