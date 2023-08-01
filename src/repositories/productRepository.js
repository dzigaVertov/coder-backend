import { managerProductosMongo } from '../DAO/ProductManagerMongo.js';

class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getProductsQuery(parametrosBusqueda) {

        let resultadoBusqueda = await this.dao.getProductsQuery(parametrosBusqueda);
        return resultadoBusqueda;
    }

    async getProductById(id) {
        let producto = await this.dao.getProductById(id);
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
        producto = await this.dao.updateProduct(pid, camposACambiar);
        return producto;
    }

    async deleteProductById(pid) {
        const product = await this.dao.deleteProductById(pid);
        return product;
    }
}

export const prodRepository = new ProductRepository(managerProductosMongo);
