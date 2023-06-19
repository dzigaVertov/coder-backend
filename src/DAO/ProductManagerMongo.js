import mongoose from 'mongoose';
import { NotFoundError } from '../models/errors/NotFound.error.js';
import { productModel } from '../models/schemaProducto.js';

class ProductManagerMongo {
    #db;
    constructor() {
        this.#db = productModel;
    }

    async addProduct({ title, description, price, thumbnails, category, status, stock }) {
        let result = await this.#db.create(arguments[0]);
        return result;
    }

    async getProducts(busqueda, paginacion) {
        let products = await this.#db.find().lean();
        return products;
    }

    async getProductsQuery(parametrosBusqueda) {
        let query = {};

        if (parametrosBusqueda.stock === 'available') query['stock'] = { $gt: 0 };
        if (parametrosBusqueda.stock === 'unavailable') query['stock'] = 0;

        if (parametrosBusqueda.category !== 'all') {
            query['category'] = parametrosBusqueda.category;
        }

        let paginacion = { lean: true };
        if (parametrosBusqueda.paginacion) {
            paginacion.limit = parametrosBusqueda.paginacion.limit;
            paginacion.page = parametrosBusqueda.paginacion.page;

            if (parametrosBusqueda.sort !== 'none') {
                paginacion.sort = {};
                const sortAscendente = parametrosBusqueda.sort === 'asc';
                paginacion.sort[parametrosBusqueda.sortField] = sortAscendente ? 1 : -1;
            }

        }

        let productsQueryResult = await this.#db.paginate(query, paginacion);
        // Limpiar el id de mongo
        productsQueryResult.docs.forEach(x => delete(x._id));

        return productsQueryResult;
    }

    async getProductById(id) {
        const prod = this.#db.findById(id);
        if (!prod) throw new NotFoundError('Product not found');
        return prod.lean();
    }

    async updateProduct(id, campo, nuevoValor) {
        const prod = this.#db.findOneAndUpdate({ _id: id }, { campo: nuevoValor });
        if (!prod) throw new NotFoundError('Product not found');
    }

    async deleteProductById(id) {
        const prod = this.#db.findByIdAndDelete(id);
        if (!prod) throw new NotFoundError('Product not found');
    }
}

export const managerProductosMongo = new ProductManagerMongo();
