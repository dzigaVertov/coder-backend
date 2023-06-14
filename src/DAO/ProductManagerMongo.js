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

    async getProductsQuery(busqueda, paginacion) {
        let query = {};
        if (busqueda.stock === 'available') query['stock'] = { $gt: 0 };
        if (busqueda.stock === 'unavailable') query['stock'] = 0;

        // Chequear si pide paginacion
        let productsQuery = await this.#db.paginate(busqueda, paginacion);
        return productsQuery;

    }

    async getProductById(id) {
        const prod =this.#db.findById(id);
        if(!prod) throw new NotFoundError('Product not found');
        return prod.lean();
    }

    async updateProduct(id, campo, nuevoValor) {
        const prod = this.#db.findOneAndUpdate({ _id: id }, { campo: nuevoValor });
        if(!prod) throw new NotFoundError('Product not found');
    }

    async deleteProductById(id) {
        const prod = this.#db.findByIdAndDelete(id);
        if(!prod) throw new NotFoundError('Product not found');
    }
}

export const managerProductosMongo = new ProductManagerMongo();
