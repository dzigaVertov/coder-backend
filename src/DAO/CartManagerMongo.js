import mongoose from 'mongoose';
import schemaCart from '../models/schemaCart.js';

export class CartManagerMongo {
    #db;
    constructor() {
        this.#db = mongoose.model('carts', schemaCart);
    }

    async addCart(productos) {
        return this.#db.create({ productos: productos });
    }

    async getCartById(id) {
        return this.#db.find({ id: id });
    }

    async getCarts() {
        return this.#db.find();
    }


    async getProductos(idCart) {
        return this.#db.find({ "_id": idCart }).productos;
    }

    async updateProductos(idCart, productos) {
        return this.#db.findByIdAndUpdate(idCart, { productos: productos });
    }

    async updateProductQuantity(idCart, id_producto, quantity) {
        let prueba = this.#db.findOneAndUpdate({ _id: idCart, productos: { $elemMatch: { _id: id_producto } } },
            { $inc: { 'productos.$.quantity': quantity } });
        console.log(prueba);
        return prueba;
    }

    async addProductoToCart(idCart, producto) {
        // Chequear si ya está ese procucto en el carrito
        const existeProducto = this.#db.find(
            {
                "_id": idCart,
                "productos": {
                    "$eq": { _id: producto._id }
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

    async deleteProductFromCart(idCart, idProducto) {
        return this.#db.updateOne({ "_id": idCart },
            { $pullAll: { "productos": [{ _id: idProducto }] } });
    }



}
