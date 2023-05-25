import { managerProductosMongo } from '../DAO/ProductManagerMongo.js';

export async function getHandler(req, res, next) {
    const { limit, page, sort, category, stock } = req.query;

    const busqueda = category ? { category } : {};
    if (stock === 'available') busqueda['stock'] = { $gt: 0 };
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
        res.json({ status: 'error', message: error });
    }
}


export async function postHandler(req, res, next) {
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


export async function putHandler(req, res, next) {
    const pid = req.params.pid;
    const camposAcambiar = Object.entries(req.body);

    let producto;
    for (const [campo, valorNuevo] of camposAcambiar) {
        if (campo !== 'id') {   // El campo id no se actualiza
            producto = await managerProductosMongo.updateProduct(pid, campo, valorNuevo);
        }
    }
    res.json(producto);
}

export async function delHandler(req, res, next) {
    let producto = await managerProductosMongo.deleteProductById(req.params.pid);
    let productos = await managerProductosMongo.getProducts();
    req.io.sockets.emit('actualizacion', productos);

    res.json(producto);
}

export async function getPidHandler(req, res, next) {
    const id = parseInt(req.params.pid);

    try {
        let producto = await managerProductosMongo.getProductById(id);
        res.send(producto);
    }
    catch {
        res.json({ error: 'id de producto no encontrada' });
    }

}


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

