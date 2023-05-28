import { managerProductosMongo } from '../DAO/ProductManagerMongo.js';
import { validarBusqueda } from '../services/productsServices.js';
class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getProductsQuery(opcionesBusqueda) {
        const { busqueda, paginacion } = opcionesBusqueda;
        const query = {};
        if (busqueda) {
            const { category, stock } = validarBusqueda(busqueda);
            query[category] = category;
            query[stock] = stock;
        }

        const opsPaginacion = {};
        if (paginacion.paginate) {
            opsPaginacion.paginate = true;
            opsPaginacion.limit = paginacion.limit ?? 10;
            opsPaginacion.page = paginacion.page ?? 1;
            opsPaginacion.sort = paginacion.sort ? { price: sort } : {};
        } else {
            opsPaginacion.paginate = false;
        }

        let resultPaginado = await this.dao.getProductsQuery(query, opsPaginacion);
        return resultPaginado;
    }

    async getProductById(id) {
        let producto = await managerProductosMongo.getProductById(id);
        return producto;
    }

    async getProducts() {
        const productos = await this.dao.getProducts();
        return productos;
    }

    async addProduct(prodParams) {
        // TODO: Agregar validación de producto
        const producto = await this.dao.addProduct(prodParams);
        return producto;
    }

    async updateProduct(pid, camposACambiar) {
        let producto;
        // TODO: Arreglar esto
        for (const [campo, valorNuevo] of Object.entries(camposACambiar)) {
            if (campo !== 'id') {   // El campo id no se actualiza
                producto = await this.dao.updateProduct(pid, campo, valorNuevo);
            }            
        }
        return producto;
    }

    async deleteProductById(pid){
        const product = await this.dao.deleteProductById(pid);
        return product;
    }
}

export const prodRepository = new ProductRepository(managerProductosMongo);
