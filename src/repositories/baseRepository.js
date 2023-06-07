export class BaseRepository {
    #dao;
    #domainModel;
    constructor(dao, domainModel) {
        this.#dao = dao;
        this.#domainModel = domainModel;
    }

    get dao() { return this.#dao; }

    create(data, options) {
        const domainObject = new this.#domainModel(data);
        return this.#dao.create(domainObject);
    }

    readOne(query, options) {
        return this.#dao.readOne(query);
    }

    readMany(query, options) {
        return this.#dao.readMany(query);
    }

    updateOne(query, newData, options) {
        return this.#dao.updateOne(query, newData);
    }

    updateMany(query, newData, options) {
        return this.#dao.updateMany(query, newData);
    }

    deleteOne(query, options) {
        return this.#dao.deleteOne(query);
    }

    deleteMany(query, options) {
        return this.#dao.deleteMany(query);
    }
}
