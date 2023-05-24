import { managerProductosMongo } from '../DAO/ProductManagerMongo.js';

export async function getHandler(req, res, next) {
    const { limit, page, sort, category, stock } = req.query;

    const busqueda = category ? { category } : {};
    if (stock === 'available') busqueda['stock'] = {$gt : 0};
    if (stock === 'unavailable') busqueda['stock'] = 0;
    console.log(busqueda);

    const paginacion = {
        limit: limit ?? 10,
        page: page ?? 1,
        sort: sort ? { price: sort } : {}
    };

    try {
        let resultPaginado = await managerProductosMongo.getProductsQuery(busqueda, paginacion);

        let [linkPrevPage, linkNextPage] = getLinks(resultPaginado, req);
        console.log(linkPrevPage, linkNextPage);
        let queryReturn = {
            status: 'success',
            payload: resultPaginado.docs,
            totalPages: resultPaginado.totalPages,
            prevPage: resultPaginado.prevPage,
            nextPage: resultPaginado.nextPage,
            page: resultPaginado.page,
            hasPrevPage: resultPaginado.hasPrevPage,
            hasNextPage: resultPaginado.hasNextPage,
            prevLink: linkPrevPage,
            nextLink: linkNextPage
        };

        res.json(queryReturn);
    } catch (error) {
        console.log(error);
        res.json({status:'error', message:error});
    }
}


export async function postHandler(req, res, next){
    if (!esProductoValido(req.body)) {
        console.log('petición recibida con error');
        console.log(req.body);
        return;
    }
    let producto = await managerProductosMongo.addProduct(req.body);
    let productos = await managerProductosMongo.getProducts();
    req.io.sockets.emit('actualizacion', productos);

    res.json(producto);

    let listaActualizadaProductos = await managerProductosMongo.getProducts();
    req.io.sockets.emit('actualizacion', listaActualizadaProductos);
}
