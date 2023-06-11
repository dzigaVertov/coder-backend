import { Router } from 'express';
import * as productsController from '../controllers/productsController.js';

let apiProductsRouter = Router();
export default apiProductsRouter;

apiProductsRouter.get('/', productsController.getHandler);

apiProductsRouter.post('/', productsController.postHandler);

apiProductsRouter.put('/:pid', productsController.putHandler);

apiProductsRouter.delete('/:pid', productsController.delHandler);

apiProductsRouter.get('/:pid', productsController.getPidHandler);

apiProductsRouter.post('/realTimeProducts', productsController.postRealTimeProducts);
