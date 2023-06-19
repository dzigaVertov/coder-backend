import { prodRepository } from '../repositories/productRepository.js';
import { BusquedaProductos } from '../models/BusquedaProductos.js';

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

export const productService = new ProductsService(prodRepository);
