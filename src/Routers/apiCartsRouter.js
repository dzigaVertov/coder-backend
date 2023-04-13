import express, { Router } from 'express';
import {cartManagerMongo} from '../app/servidor.js';

let apiCartsRouter = Router();


export default apiCartsRouter;

apiCartsRouter.get('/', async (req, res) => {
    let productos = await cartManagerMongo.getCarts();
    res.json(productos);
});

apiCartsRouter.post('/', async (req, res) => {
    let productos = req.body;
    let cartNuevo = await cartManagerMongo.addCart(productos);
    res.json(cartNuevo);
});

apiCartsRouter.get('/:cid', async (req, res) => {
    let cartId = req.params.cid;
    let cart = await cartManagerMongo.getCartById(cartId);

    res.json(cart);    
});

apiCartsRouter.post('/:cid/product/:pid', async (req, res) => {
    let idCarrito = req.params.cid;
    let codigoProducto = req.params.pid;

    let carritoActualizado = await cartManagerMongo.addProductoToCart(idCarrito, codigoProducto);
    res.json(carritoActualizado);
});


