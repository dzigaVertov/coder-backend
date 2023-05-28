import mongoose from 'mongoose';
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

    async getProductsQuery(busqueda, paginacion) {
        let query = {};
        if (busqueda.stock === 'available') query['stock'] = { $gt: 0 };
        if (busqueda.stock === 'unavailable') query['stock'] = 0;

        // Chequear si pide paginacion
        let productsQuery = await this.#db.paginate(busqueda, paginacion);
        return productsQuery;

    }

    async getProductById(id) {
        return this.#db.findById(id).lean();
    }

    async updateProduct(id, campo, nuevoValor) {
        this.#db.findOneAndUpdate({ _id: id }, { campo: nuevoValor });
    }

    async deleteProductById(id) {
        this.#db.findByIdAndDelete(id);
    }
}

export const managerProductosMongo = new ProductManagerMongo();
