import { managerProductosMongo } from '../DAO/ProductManagerMongo.js';
import { prodRepository } from '../repositories/productRepository.js';

export async function getHandler(req, res, next) {
    const { paginate, limit, page, sort, category, stock } = req.query;
    const busqueda = { category, stock };
    const paginacion = { paginate, limit, page, sort };

    try {
        let resultPaginado = await prodRepository.getProductsQuery(busqueda, paginacion);

        let [linkPrevPage, linkNextPage] = getLinks(resultPaginado, req);

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
        next(error);
    }
}

export async function getPidHandler(req, res, next) {
    const id = parseInt(req.params.pid);

    try {
        const producto = await prodRepository.getProductById(id);
        res.send(producto);
    }
    catch (error) {
        next(error);
    }
}



export async function postHandler(req, res, next) {

    try {
        if (!parametrosValidos(req.body)) {
            throw new Error('Error en la petición, parámetros no válidos');
        }
        const paramsProducto = req.body;
        const producto = await prodRepository.addProduct(paramsProducto);
        const productos = await prodRepository.getProducts();
        req.io.sockets.emit('actualizacion', productos);
        res.json(producto);

        console.log('Ver necesidad de esto acá abajo');
        let listaActualizadaProductos = await managerProductosMongo.getProducts();
        req.io.sockets.emit('actualizacion', listaActualizadaProductos);
    } catch (error) {
        next(error);
    }
}


export async function putHandler(req, res, next) {
    const pid = req.params.pid;
    const camposAcambiar = Object.entries(req.body);
    try {
        const producto = prodRepository.updateProduct(pid, camposAcambiar);
        res.json(producto);
    } catch (error) {
        return next(error);
    }
}

export async function delHandler(req, res, next) {
    const pid = req.params.pid;
    try {
        let producto = await prodRepository.deleteProductById(pid);
        let productos = await prodRepository.getProducts();
        req.io.sockets.emit('actualizacion', productos);
        res.json(producto);
    } catch (error) {
        next(error);
    }
}



function parametrosValidos(body) {
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

