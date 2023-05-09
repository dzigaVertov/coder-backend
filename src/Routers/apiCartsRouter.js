import express, { Router } from 'express';
import { cartManagerMongo } from '../DAO/CartManagerMongo.js';

let apiCartsRouter = Router();
export default apiCartsRouter;


apiCartsRouter.get('/', async (req, res) => {
    let carts = await cartManagerMongo.getCarts();
    res.json(carts);
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

apiCartsRouter.put('/:cid', async (req, res) => {
    let cartId = req.params.cid;
    let productos = req.body;
    // TODO: Esto no devuelve el carrito actualizado
    let actualizado = await cartManagerMongo.updateProductos(cartId, productos);
    res.json(actualizado);
});

apiCartsRouter.post('/:cid/product/:pid', async (req, res) => {
    let idCarrito = req.params.cid;
    let codigoProducto = req.params.pid;

    console.log('aca llegamos');

    let carritoActualizado = await cartManagerMongo.addProductoToCart(idCarrito, codigoProducto);
    res.json(carritoActualizado);
});

apiCartsRouter.put('/:cid/product/:pid', async (req, res) => {
    let idCarrito = req.params.cid;
    let idProducto = req.params.pid;
    let { quantityNueva } = req.body;

    let carritoActualizado = await cartManagerMongo.updateProductQuantity(idCarrito, idProducto, quantityNueva);
    res.json(carritoActualizado);
});


apiCartsRouter.delete('/:cid/product/:pid', async (req, res) => {
    let idCarrito = req.params.cid;
    let codigoProducto = req.params.pid;
    let carritoActualizado = await cartManagerMongo.deleteProductFromCart(idCarrito, codigoProducto);
    res.json(carritoActualizado);
});

apiCartsRouter.delete('/:cid', async (req, res) => {
    let idCarrito = req.params.cid;
    let carritoActualizado = await cartManagerMongo.updateProductos(idCarrito, []);
    res.json(carritoActualizado);
});


