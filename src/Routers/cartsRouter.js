import express, { Router } from 'express';
import { getCidHandler } from '../controllers/cartsController.js';
import { autenticarJwtView } from '../middlewares/passport.js';


const cartsRouter = Router();
export default cartsRouter;

cartsRouter.get('/:cid', autenticarJwtView, getCidHandler);
