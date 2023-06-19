import { prodRepository } from '../repositories/productRepository.js';
import { BusquedaProductos } from '../models/BusquedaProductos.js';


// TODO: incluir dentro de ese objeto los métodos para generar links
// TODO: Pasar ese modelo al repositorio para que haga la búsqueda (¿?)
// TODO: Eliminar del repositorio y del DAO cualquier responsabilidad en relación a la validación de la búsqueda.

class ProductsService {
    constructor(prodRepository) {
        this.prodRepository = prodRepository;
    }

    async obtenerListaProductos(opcionesBusqueda) {
        const parametrosBusqueda = new BusquedaProductos(opcionesBusqueda);
        const resultadoBusqueda = await prodRepository.getProductsQuery(parametrosBusqueda);
        return resultadoBusqueda;

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

export const productService = new ProductsService(prodRepository);
