import mongoose from 'mongoose';
import { NotFoundError } from '../models/errors/NotFound.error.js';
import { productModel } from '../models/schemaProducto.js';

class ProductManagerMongo {
    #db;
    constructor() {
        this.#db = productModel;
    }

    async addProduct({ title, description, price, thumbnails, category, status, stock, id }) {
        let result = await this.#db.create(arguments[0]);
        return result;
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
        console.log('pid: ', pid);
        const prod = await this.#db.findOne({ id: pid }).lean();
        if (!prod) throw new NotFoundError('Product not found');
        // Limpiar el id de mongo
        delete (prod._id);
        return prod;
    }

    async updateProduct(id, campo, nuevoValor) {
        const prod = this.#db.findOneAndUpdate({ id: id }, { campo: nuevoValor });
        if (!prod) throw new NotFoundError('Product not found');
    }

    async deleteProductById(id) {
        const prod = this.#db.findByIdAndDelete(id);
        if (!prod) throw new NotFoundError('Product not found');
    }
}

export const managerProductosMongo = new ProductManagerMongo();
