import mongoose from 'mongoose';
import schemaProducto from '../models/schemaProducto.js';

export class ProductManagerMongo {
    #db;
    constructor() {
        this.#db = mongoose.model('productos', schemaProducto);
    }

    async addProduct({ title, description, price, thumbnails, code, category, status, stock }) {
        this.#db.insertOne(arguments);
    }

    async getProducts(){
        return this.#db.find();
    }

    async getProductById(id){
        return this.#db.find({id : id});
    }

    async updateProduct(id, campo, nuevoValor) {
        this.#db.findOneAndUpdate({id : id}, {campo : nuevoValor});        
    }

    async deleteProductById(id){
        this.#db.deleteOne({id:id});
    }
}
