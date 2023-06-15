import mongoose from '../database/mongoose.js';
import { NotFoundError } from '../models/errors/NotFound.error.js';
import { usuarioSchemaModel } from '../models/schemaUsuario.js';
import { toPojo } from '../utils/topojo.js';

class UsersDaoMongoose {
    #db;
    constructor(db) {
        this.#db = db;
    }

    async create(newUser) {
        return toPojo(await this.#db.create(newUser));
    }

    async create(newUser) {
        return toPojo(await this.#db.create(newUser));
    }

    async readOne(query) {
        const result = await this.#db.findOne(query).lean();
        if (!result) throw new NotFoundError('Usuario no encontrado');
        return result;
    }

    async readMany(query) {
        return await this.#db.find(query).lean();
    }

    async updateOne(query, newData) {
        const result = await this.#db.updateOne(query, newData);
        if (!result) throw new NotFoundError('Usuario no encontrado');
        return result;
    }

    async findOneAndUpdate(query, newData) {
        const result = this.#db.findOneAndUpdate(query, newData);
        if (!result) throw new NotFoundError('Usuario no encontrado');
        return result.lean();
    }

    async updateMany(query, newData) {
        await this.#db.updateMany(query, newData);
    }

    async deleteOne(query) {
        const result = await this.#db.findOneAndDelete(query);
        if (!result) throw new NotFoundError('Usuario no encontrado');
        return toPojo(result);
    }

    async deleteMany(query) {
        await this.#db.deleteMany(query);
    }

}

export const usersDaoMongoose = new UsersDaoMongoose(usuarioSchemaModel);
