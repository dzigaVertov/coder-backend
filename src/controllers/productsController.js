import { prodRepository } from '../repositories/productRepository.js';
import { obtenerProductosPaginados } from '../services/productsServices.js';

export async function getHandler(req, res, next) {
    const { paginate, limit, page, sort, category, stock } = req.query;
    const busqueda = { category, stock };
    const paginacion = { paginate, limit, page, sort };

    try {
        const queryReturn = obtenerProductosPaginados(busqueda, paginacion);
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

export async function getRealTimeProducts(req, res, next) {
    try {
        const productos = prodRepository.getProducts();      
        res.render('realTimeProducts',
            { pageTitle: 'realtime', productos: productos });
    } catch (error) {
        next(error);
    }
}

export async function postHandler(req, res, next) {

    try {
        const paramsProducto = req.body;
        const producto = await prodRepository.addProduct(paramsProducto);
        const productos = await prodRepository.getProducts();
        req.io.sockets.emit('actualizacion', productos);
        res.json(producto);
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

// TODO: Arreglar esto
export async function postRealTimeProducts(req, res, next) {
    try {
        
        let producto = await prodRepository.addProduct(req.body);
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

