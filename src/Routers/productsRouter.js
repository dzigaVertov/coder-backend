import express, { Router } from 'express';
import {managerProductos, managerProductosMongo} from '../app/servidor.js';

let productsRouter = Router();
export default productsRouter;



productsRouter.get('/', async (req, res) => {
    // let productos = await managerProductos.getProducts();
    let productos = await managerProductosMongo.getProducts();

    res.render('home', { pageTitle: 'éxito', productos: productos });
});

productsRouter.get('/realTimeProducts', async (req, res) => {
    // let productos = await managerProductos.getProducts();
    let productos = await managerProductosMongo.getProducts();
    res.render('realTimeProducts', { pageTitle: 'realtime', productos: productos });
});
