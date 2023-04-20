import express, { Router } from 'express';
import { managerProductosMongo } from '../app/servidor.js';

let productsRouter = Router();
export default productsRouter;



productsRouter.get('/', async (req, res) => {
    const { limit, page, sort, category, stock } = req.query;

    const busqueda = category ? { category } : {};
    if (stock === 'available') busqueda['stock'] = { $gt: 0 };
    if (stock === 'unavailable') busqueda['stock'] = 0;
    console.log(busqueda);

    const paginacion = {
        limit: limit ?? 5,
        page: page ?? 1,
        sort: sort ? { price: sort } : {},
        lean: true  // para que devuelva objetos literales, no de mongoose
    };

    let productosPaginados = await managerProductosMongo.getProductsQuery(busqueda, paginacion);

    let contextoPaginacion = getContextoPaginacion(productosPaginados);

    res.render('home', contextoPaginacion);
});

productsRouter.get('/:pid', async (req, res) => {
    let pid = req.params.pid;
    let producto = await managerProductosMongo.getProductById(pid);
    res.render('producto', { producto });
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
    let { title, description, price, status, stock, category } = body;

    let strs = [title, description, category];
    let nums = [price, stock];

    let strsValidas = strs.every(elem => {
        return (typeof (elem) === 'string');
    });

    let numsValidos = nums.every(n => !isNaN(Number(n)));

    return (typeof status === 'boolean') && strsValidas && numsValidos;
}


function getContextoPaginacion(productosPaginados) {
    let contexto = {
        hayDocs: productosPaginados.docs.length > 0,
        productos: productosPaginados.docs,
        limit: productosPaginados.limit,
        page: productosPaginados.page,
        totalPages: productosPaginados.totalPages,
        hasNextPage: productosPaginados.hasNextPage,
        nextPage: productosPaginados.nextPage,
        hasPrevPage: productosPaginados.hasPrevPage,
        prevPage: productosPaginados.prevPage,
        pagingCounter: productosPaginados.pagingCounter,
    };

    return contexto;
}
