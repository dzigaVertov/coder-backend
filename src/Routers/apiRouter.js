import { Router } from 'express';
import apiSessionsRouter from './apiSessionsRouter.js'
import apiCartsRouter from './apiCartsRouter.js';
import apiProductsRouter from './apiProductsRouter.js';
import apiUsersRouter from './apiUsersRouter.js';
import { mockingProductsRouter } from './mockingProductsRouter.js';
import { apiErrorHandler } from '../middlewares/apiErrorHandler.js';

const apiRouter = Router();

apiRouter.use('/sessions', apiSessionsRouter);
apiRouter.use('/users', apiUsersRouter);
apiRouter.use('/products', apiProductsRouter);
apiRouter.use('/carts', apiCartsRouter);
apiRouter.use('/mockingProducts', mockingProductsRouter);
apiRouter.use(apiErrorHandler);

export default apiRouter;
