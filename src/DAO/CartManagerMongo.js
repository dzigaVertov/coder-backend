import mongoose from 'mongoose';
import cartModel from '../models/schemaCart.js';

class CartManagerMongo {
    #db;
    constructor() {
        this.#db = cartModel;
    }

    async create(cartData) {
        return this.#db.create(cartData);
    }

    async getCartById(id) {
        return this.#db.findOne({ "_id": id }).lean();
    }

    async getCarts() {
        return this.#db.find();
    }



    async updateProductos(idCart, productos) {
        return this.#db.findByIdAndUpdate(idCart, { productos: productos });
    }

    async updateProductQuantity(idCart, id_producto, quantity) {
        let prueba = this.#db.findOneAndUpdate({
            _id: idCart,
            productos: { $elemMatch: { _id: id_producto } }
        },
            { $inc: { 'productos.$.quantity': quantity } });

        console.log(prueba);
        return prueba;
    }

    async addProductoToCart(idCart, idProducto) {
        // Chequear si ya está ese procucto en el carrito
        const existeProducto = await this.#db.find(
            {
                "_id": idCart,
                "productos": {
                    "$eq": { _id: idProducto }
                }
            }).lean();

        console.log(existeProducto);

        if (existeProducto.length > 0) {
            console.log('primera rama');
            return this.#db.updateOne(
                {
                    "_id": idCart,
                    "productos._id": idProducto
                    }
                ,
                { "$inc": { "productos.$.quantity": 1 } }
            );
        } else {
            console.log(idProducto);
            return this.#db.updateOne(
                { "_id": idCart },
                { "$push": { "productos": {"_id": idProducto, "quantity": 1} } });
        }
    }

    async deleteProductFromCart(idCart, idProducto) {
        return this.#db.updateOne({ "_id": idCart },
            { $pullAll: { "productos": [{ _id: idProducto }] } });
    }



}

export const cartManagerMongo = new CartManagerMongo();
