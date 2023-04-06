import mongoose from 'mongoose';
import schemaCart from '../models/schemaCart.js';

export class CartManagerMongo {
    #db;
    constructor() {
        this.#db = mongoose.model('carts', schemaCart);
    }

    async addCart(productos){
        this.#db.insertOne(productos);
    }

    async getCartById(id){
        return this.#db.find({id : id});
    }

    async addProductoToCart(idCart, producto){
        const cart = getCartById(idCart);
        

        
    }

    esProductoRepetido(cart, codigoProducto) {
        if (cart.products.some(prod => prod.codigoProducto === codigoProducto)) {
            return true;
        }
        return false;
    }

}
