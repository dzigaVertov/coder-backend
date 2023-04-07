import mongoose from 'mongoose';
import schemaCart from '../models/schemaCart.js';

export class CartManagerMongo {
    #db;
    constructor() {
        this.#db = mongoose.model('carts', schemaCart);
    }

    async addCart(productos) {
        this.#db.insertOne(productos);
    }

    async getCartById(id) {
        return this.#db.find({ id: id });
    }


    async getProductos(idCart){
        return this.#db.find({"_id" : idCart}).productos;
    }
    
    async addProductoToCart(idCart, producto) {
        // Chequear si ya está ese procucto en el carrito
        const existeProducto = this.#db.find(
            {
                "_id": idCart,
                "productos": {
                    "$eq": { 'codigoProducto': producto.codigoProducto }
                }
            });

        if (existeProducto) {
            this.#db.updateOne({ "_id": idCart },
                { "$inc": { "productos.$.quantity": 1 } }
            );
        } else {
            this.#db.updateOne({ "_id": idCart }, { "$push": { "productos": producto } });
        }
    }

}
