import express, { Router } from 'express';
import {managerProductos} from '../app/servidor.js';

let apiProductsRouter = Router();
export default apiProductsRouter;

apiProductsRouter.use(express.json());
apiProductsRouter.use(express.urlencoded({ extended: true }));




apiProductsRouter.get('/', async (req, res) => {
    let products = await managerProductos.getProducts();
    const { limit } = req.query;
    if (limit) {
        products = products.slice(0, limit);
    }
    res.json({ products: products });
});

apiProductsRouter.post('/', async (req, res) => {
    if (!esProductoValido(req.body)) {
        res.status(400).json({ error: "Producto no válido" });
        return;
    }
    let producto = await managerProductos.addProduct(req.body);
    let productos = await managerProductos.getProducts();
    req.io.sockets.emit('actualizacion', productos);

    res.json(producto);
});

apiProductsRouter.put('/:pid', async (req, res) => {

    const pid = req.params.pid;

    const camposAcambiar = Object.entries(req.body);

    let producto;
    for (const [campo, valorNuevo] of camposAcambiar) {
        if (campo !== 'id') {   // El campo id no se actualiza
            producto = await managerProductos.updateProduct(pid, campo, valorNuevo);
        }
    }
    res.json(producto);
});

apiProductsRouter.delete('/:pid', async (req, res) => {
    let producto = await managerProductos.deleteProduct(req.params.pid);
    let productos = await managerProductos.getProducts();
    req.io.sockets.emit('actualizacion', productos);

    res.json(producto);
});


apiProductsRouter.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        let producto = await managerProductos.getProductById(id);
        res.send(producto);
    }
    catch {
        res.json({ error: 'id de producto no encontrada' });
    }

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
