import { managerProductosMongo } from '../DAO/ProductManagerMongo.js';

class ProductRepository {
    constructor(dao){
        this.dao = dao;
    }

    async getProductsQuery(opcionesBusqueda){
        const {busqueda, paginacion} = opcionesBusqueda;
        const query = category ? { category } : {};
    if (stock === 'available') query['stock'] = { $gt: 0 };
    if (stock === 'unavailable') query['stock'] = 0;

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
}

export const prodRepository = new ProductRepository(managerProductosMongo);
