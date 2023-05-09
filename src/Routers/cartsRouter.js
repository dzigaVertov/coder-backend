import express, { Router } from 'express';
import { cartManagerMongo } from '../DAO/CartManagerMongo.js';


const cartsRouter = Router();
export default cartsRouter;

cartsRouter.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const carrito = await cartManagerMongo.getCartById(cid);
    const productos = carrito.productos;
    const hayDocs = productos.length > 0;
    res.render('cart', {productos, hayDocs});
    
});
