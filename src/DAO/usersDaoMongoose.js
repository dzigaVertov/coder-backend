import mongoose from '../database/mongoose.js';
import { usuarioModel } from '../models/schemaUsuario.js';
import {toPojo} from '../utils/topojo.js';

class UsersDaoMongoose {
    #db;
    constructor(db){
        this.#db = db;
    }

    async create(newUser){
        return toPojo(await this.#db.create(newUser));        
    }

    async readOne(query){
        const result = await this.#db.findOne(query).lean();
        if(!result) throw new Erro('No Encontrado');
    }

    async readMany(query){
        return await this.#db.find(query).lean();
    }

    async update(query, newData){
        const modified_user = this.#db.updateOne(query, newData);
        if(!modified_user) throw new Error('No encontrado');
        return toPojo(modified_user);
    }

    async updateMany(query, newData){
        await this.#db.updateMany(query, newData);
    }

    async deleteOne(query){
        const deletedUser = await this.#db.findOneAndDelete(query).lean();
        if (!deletedUser) throw new Error('No encontrado');;
        return toPojo(deletedUser);
    }

    async deleteMany(query){
        await this.#db.deleteMany(query);
    }
    
}

export const usersDaoMongoose = new UsersDaoMongoose(usuarioModel);
