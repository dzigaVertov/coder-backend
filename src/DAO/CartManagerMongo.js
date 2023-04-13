import mongoose from 'mongoose';
import schemaCart from '../models/schemaCart.js';

export class CartManagerMongo {
    #db;
    constructor() {
        this.#db = mongoose.model('carts', schemaCart);
    }

    async addCart(productos) {
        return this.#db.create({productos: []});
    }

    async getCartById(id) {
        return this.#db.find({ id: id });
    }

    async getCarts(){
        return this.#db.find();
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
            return this.#db.updateOne({ "_id": idCart },
                { "$inc": { "productos.$.quantity": 1 } }
            );
        } else {
            return this.#db.updateOne({ "_id": idCart }, { "$push": { "productos": producto } });
        }
    }

}
