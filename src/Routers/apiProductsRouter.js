import { Router } from 'express';
import { managerProductosMongo } from '../app/servidor.js';

let apiProductsRouter = Router();
export default apiProductsRouter;

apiProductsRouter.get('/', async (req, res) => {
    let products = await managerProductosMongo.getProducts();
    const { limit } = req.query;
    if (limit) {
        products = products.slice(0, limit);
    }
    res.json({ products: products });
});

apiProductsRouter.post('/', async (req, res) => {
    if (!esProductoValido(req.body)) {
        console.log('petición recibida con error');
        console.log(req.body);
        console.log(typeof req.body);
        return;
    }
    let producto = await managerProductosMongo.addProduct(req.body);
    let productos = await managerProductosMongo.getProducts();
    req.io.sockets.emit('actualizacion', productos);

    res.json(producto);

    let listaActualizadaProductos = await managerProductosMongo.getProducts();
    req.io.sockets.emit('actualizacion', listaActualizadaProductos);
});

apiProductsRouter.put('/:pid', async (req, res) => {

    const pid = req.params.pid;

    const camposAcambiar = Object.entries(req.body);

    let producto;
    for (const [campo, valorNuevo] of camposAcambiar) {
        if (campo !== 'id') {   // El campo id no se actualiza
            producto = await managerProductosMongo.updateProduct(pid, campo, valorNuevo);
        }
    }
    res.json(producto);
});

apiProductsRouter.delete('/:pid', async (req, res) => {
    let producto = await managerProductosMongo.deleteProductById(req.params.pid);
    let productos = await managerProductosMongo.getProducts();
    req.io.sockets.emit('actualizacion', productos);

    res.json(producto);
});


apiProductsRouter.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        let producto = await managerProductosMongo.getProductById(id);
        res.send(producto);
    }
    catch {
        res.json({ error: 'id de producto no encontrada' });
    }

});

apiProductsRouter.put('/:pid', async (req, res) => {

    const pid = req.params.pid;

    const camposAcambiar = Object.entries(req.body);

    let producto;
    for (const [campo, valorNuevo] of camposAcambiar) {
        if (campo !== 'id') {   // El campo id no se actualiza
            producto = await managerProductosMongo.updateProduct(pid, campo, valorNuevo);
        }
    }
    res.json(producto);
});

apiProductsRouter.delete('/:pid', async (req, res) => {
    let producto = await managerProductosMongo.deleteProductById(req.params.pid);
    let productos = await managerProductosMongo.getProducts();
    req.io.sockets.emit('actualizacion', productos);

    res.json(producto);
});


apiProductsRouter.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        let producto = await managerProductosMongo.getProductById(id);
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
    
    return ((status === 'true') || (status === 'false')) && strsValidas && numsValidos;
}

