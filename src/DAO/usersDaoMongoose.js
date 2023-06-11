import mongoose from '../database/mongoose.js';
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
        if (!result) throw new Error('No Encontrado');
        return result;
    }

    async readMany(query) {
        return await this.#db.find(query).lean();
    }

    async updateOne(query, newData) {
        return await this.#db.updateOne(query, newData);
    }

    async findOneAndUpdate(query, newData) {
        const modified_user = this.#db.findOneAndUpdate(query, newData).lean();
        if (!modified_user) throw new Error('No encontrado');
        return modified_user;
    }

    async updateMany(query, newData) {
        await this.#db.updateMany(query, newData);
    }

    async deleteOne(query) {
        const deletedUser = await this.#db.findOneAndDelete(query).lean();
        if (!deletedUser) throw new Error('No encontrado');;
        return toPojo(deletedUser);
    }

    async deleteMany(query) {
        await this.#db.deleteMany(query);
    }

}

export const usersDaoMongoose = new UsersDaoMongoose(usuarioSchemaModel);
