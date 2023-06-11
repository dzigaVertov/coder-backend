import { stockOptions, categoryOptions } from '../models/busquedaOptions.js';
import { prodRepository } from '../repositories/productRepository.js';

export function validarBusqueda({ category, stock }) {

    if (!stockOptions.includes(stock)) throw new Error('Invalid Stock');
    if (!categoryOptions.includes(category)) throw new Error('Invalid Category');

    return { category, stock };
}


export function validarPaginacion(paginacion) {
    const { limit, page, sort } = paginacion;
    if (paginacion) {

    }
}


export async function obtenerProductosPaginados(busqueda, paginacion) {

    let resultPaginado = await prodRepository.getProductsQuery(busqueda, paginacion);

    let [linkPrevPage, linkNextPage] = getLinks(resultPaginado, busqueda, paginacion);

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

    return queryReturn;
}


function getLinks(resultPaginado, busqueda, paginacion) {
    let { hasPrevPage, hasNextPage, prevPage, nextPage } = resultPaginado;
    const { category } = busqueda;
    const { limit, sort } = paginacion;

    let linkPrevPage = hasPrevPage ? (req.baseUrl + `?limit=${limit}&page=${prevPage}`) : null;
    let linkNextPage = hasNextPage ? (req.baseUrl + `?limit=${limit}&page=${nextPage}`) : null;

    return [linkPrevPage, linkNextPage];

}
