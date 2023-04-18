import mongoose from 'mongoose';
import { productModel } from '../models/schemaProducto.js';

export class ProductManagerMongo {
    #db;
    constructor() {
        this.#db = productModel;
        this.#db.syncIndexes();
    }

    async addProduct({ title, description, price, thumbnails, code, category, status, stock }) {
        let result = await this.#db.create(arguments[0]);
        return result;
    }

    async getProducts(busqueda, paginacion) {
        let products = await this.#db.find().lean();
        return products;
    }

    async getProductsQuery(busqueda, paginacion) {
            let productsQuery = await this.#db.paginate(busqueda, paginacion);
            return productsQuery;

    }

    async getProductById(id) {
        return this.#db.find({ id: id });
    }

    async updateProduct(id, campo, nuevoValor) {
        this.#db.findOneAndUpdate({ id: id }, { campo: nuevoValor });
    }

    async deleteProductById(id) {
        this.#db.deleteOne({ id: id });
    }
}
