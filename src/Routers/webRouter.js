import { Router } from 'express';
import userRouter from './userRouter.js';
import productsRouter from './productsRouter.js';
import chatRouter from './chatRouter.js';
import cartsRouter from './cartsRouter.js';
const webRouter = Router();

webRouter.use('/', userRouter);
webRouter.use('/products', productsRouter);
webRouter.use('/chat', chatRouter);
webRouter.use('/carts', cartsRouter);

export default webRouter;
