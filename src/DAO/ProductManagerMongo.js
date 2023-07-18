import mongoose from 'mongoose';
import { InvalidArgumentError } from '../models/errors/InvalidArgument.error.js';
import { NotFoundError } from '../models/errors/NotFound.error.js';
import { productModel } from '../models/schemaProducto.js';
import { toPojo } from '../utils/topojo.js';
class ProductManagerMongo {
    #db;
    constructor() {
        this.#db = productModel;
    }

    async addProduct(datosProducto) {
        try {
            let result = toPojo(await this.#db.create(datosProducto));
            delete result._id
            return result;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new InvalidArgumentError('error.message');
            }
        }
    }

    async getProducts(busqueda, paginacion) {
        let products = await this.#db.find().lean();
        return products;
    }

    async getProductsQuery(parametrosBusqueda) {
        let query = {};

        if (parametrosBusqueda.stock === 'available') query['stock'] = { $gt: 0 };
        if (parametrosBusqueda.stock === 'unavailable') query['stock'] = 0;

        if (parametrosBusqueda.category !== 'all') {
            query['category'] = parametrosBusqueda.category;
        }

        let paginacion = { lean: true, leanWithId: false }; // leanWithId: con esta opción evito que al transformar el objeto de mongoose en un objeto plano sobreescriba el campo id (generado por mí) con el valor del campo _id generado por mongo
        if (parametrosBusqueda.paginacion) {
            paginacion.limit = parametrosBusqueda.paginacion.limit;
            paginacion.page = parametrosBusqueda.paginacion.page;

            if (parametrosBusqueda.sort !== 'none') {
                paginacion.sort = {};
                const sortAscendente = parametrosBusqueda.sort === 'asc';
                paginacion.sort[parametrosBusqueda.sortField] = sortAscendente ? 1 : -1;
            }

        }

        let productsQueryResult = await this.#db.paginate(query, paginacion);

        // Limpiar el id de mongo
        productsQueryResult.docs.forEach(x => delete (x._id));

        return productsQueryResult;
    }

    async getProductById(pid) {
        const prod = await this.#db.findOne({ id: pid }).lean();
        if (!prod) throw new NotFoundError('Product not found');
        delete (prod._id);
        return prod;
    }

    async readOne(query) {
        const prod = await this.#db.findOne(query).lean();
        if (!prod) throw new NotFoundError('Product not found');
        delete (prod._id);
        return prod;
    }

    async readMany(query) {
        const prods = await this.#db.find(query).select({ _id: 0 }).lean();
        if (!prods || prods.length === 0) throw new NotFoundError('Product not found');
        return prods;
    }

    async updateProduct(query, newValues) {
        const prod = await this.#db.findOneAndUpdate(query, newValues, { new: true }).lean();
        if (!prod) throw new NotFoundError('Product not found');
        delete prod._id;
        return prod;
    }

    async deleteProductById(id) {
        const prod = this.#db.findByIdAndDelete(id);
        if (!prod) throw new NotFoundError('Product not found');
    }
}

export const managerProductosMongo = new ProductManagerMongo();
