import mongoose from 'mongoose';
import schemaProducto from '../models/schemaProducto.js';

export class ProductManagerMongo {
    #db;
    constructor() {
        this.#db = mongoose.model('productos', schemaProducto);
        this.#db.syncIndexes();
    }

    async addProduct({ title, description, price, thumbnails, code, category, status, stock }) {
        let result = await this.#db.create(arguments[0]);
        return result;
    }

    async getProducts() {
        let products = await this.#db.find().lean();
        return products;
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
