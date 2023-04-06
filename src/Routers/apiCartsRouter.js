import express, { Router } from 'express';
import CartManagerFile from '../DAO/CartManagerFile.js';

let apiCartsRouter = Router();
const cartManagerFile = new CartManagerFile('./src/carts.json');

export default apiCartsRouter;


apiCartsRouter.use(express.json());
apiCartsRouter.use(express.urlencoded({ extended: true}));

apiCartsRouter.post('/', async (req, res) => {
    let idCartNuevo = await cartManager.addCart();
    res.json({idCart : idCartNuevo});
});

apiCartsRouter.get('/:cid', async (req, res) => {
    let cartId = req.params.cid;
    let cart = await cartManager.getCartbyId(cartId);

    res.json(cart.products);    
});

apiCartsRouter.post('/:cid/product/:pid', async (req, res) => {
    let idCarrito = req.params.cid;
    let carrito = await cartManager.getCartbyId(idCarrito);
    let productoCarrito = await carrito.addProduct(req.params.pid);

    cartManager.guardarArchivo();
    res.json(productoCarrito);
});


