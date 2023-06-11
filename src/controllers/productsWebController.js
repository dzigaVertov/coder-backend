import { prodRepository } from "../repositories/productRepository.js";
import { obtenerProductosPaginados } from "../services/productsServices.js";

export async function getHandler(req, res, next) {
    const { paginate, limit, page, sort, category, stock } = req.query;
    const busqueda = { category: category || 'all', stock: stock || 'all' };
    const paginacion = { paginate, limit, page, sort };

    try {
        const queryReturn = obtenerProductosPaginados(busqueda, paginacion);
        res.render('home', queryReturn);
    } catch (error) {
        next(error);
    }
}

export async function getPidHandler(req, res, next) {
    const id = parseInt(req.params.pid);

    try {
        const producto = await prodRepository.getProductById(id);
        res.render('producto', { producto });
    }
    catch (error) {
        next(error);
    }
}
