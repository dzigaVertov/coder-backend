import express, { Router } from 'express';
import { managerProductosMongo } from '../app/servidor.js';

let productsRouter = Router();
export default productsRouter;



productsRouter.get('/', async (req, res) => {
    let productos = await managerProductosMongo.getProducts();

    res.render('home', { pageTitle: 'éxito', productos: productos });
});

productsRouter.get('/realTimeProducts', async (req, res) => {
    let productos = await managerProductosMongo.getProducts();
    res.render('realTimeProducts',
        { pageTitle: 'realtime', productos: productos });
});

productsRouter.post('/realTimeProducts', async (req, res) => {
    if (!esProductoValido(req.body)) {
        res.status(400).json({ error: "Producto no válido" });
        return;
    }
    console.log('llegada la peticion');
    let producto = await managerProductosMongo.addProduct(req.body);
    let productos = await managerProductosMongo.getProducts();
    req.io.sockets.emit('actualizacion', productos);
    res.json(producto);
});


function esProductoValido(body) {
    let { title, description, code, price, status, stock, category } = body;

    let strs = [title, description, category, code];
    let nums = [price, stock];

    let strsValidas = strs.every(elem => {
        return (typeof (elem) === 'string');
    });

    let numsValidos = nums.every(n => !isNaN(Number(n)));

    return (typeof status === 'boolean') && strsValidas && numsValidos;
}
