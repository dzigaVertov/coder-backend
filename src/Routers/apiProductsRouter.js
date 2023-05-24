import { Router } from 'express';
import { managerProductosMongo } from '../DAO/ProductManagerMongo.js';
import * as productsController from '../controllers/productsController.js';

let apiProductsRouter = Router();
export default apiProductsRouter;

apiProductsRouter.get('/', productsController.getHandler);

apiProductsRouter.post('/', productsController.postHandler);

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
    let { title, description, price, status, stock, category } = body;

    let strs = [title, description, category];
    let nums = [price, stock];

    let strsValidas = strs.every(elem => {
        return (typeof (elem) === 'string');
    });

    let numsValidos = nums.every(n => !isNaN(Number(n)));

    return ((status === 'true') || (status === 'false')) && strsValidas && numsValidos;
}

function getLinks(resultPaginado, req) {
    let { hasPrevPage, hasNextPage, prevPage, nextPage } = resultPaginado;
    const { limit, sort, category } = req.query;

    let linkPrevPage = hasPrevPage ? (req.baseUrl + `?limit=${limit}&page=${prevPage}`) : null;
    let linkNextPage = hasNextPage ? (req.baseUrl + `?limit=${limit}&page=${nextPage}`) : null;

    return [linkPrevPage, linkNextPage];

}
