import { Router } from 'express';
import * as productsController from '../controllers/productsController.js';
import { soloRol } from '../middlewares/autorizacion.js';
import { autenticarJwtApi } from '../middlewares/passport.js';

let apiProductsRouter = Router();
export default apiProductsRouter;

apiProductsRouter.get('/', productsController.getHandler);

apiProductsRouter.post('/', autenticarJwtApi, soloRol('admin'), productsController.postHandler);

apiProductsRouter.put('/:pid', autenticarJwtApi, soloRol('admin'), productsController.putHandler);

apiProductsRouter.delete('/:pid', soloRol('admin'), productsController.delHandler);

apiProductsRouter.get('/:pid', productsController.getPidHandler);

apiProductsRouter.post('/realTimeProducts', soloRol('admin'), productsController.postRealTimeProducts);

// TODO: Hacer que el put devuelva el producto actualizado
