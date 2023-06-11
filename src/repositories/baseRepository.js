export class BaseRepository {
    #dao;
    #domainModel;
    constructor(dao, domainModel) {
        this.#dao = dao;
        this.#domainModel = domainModel;
    }

    get dao() { return this.#dao; }

    async create(data, options) {
        const domainObject = new this.#domainModel(data);
        console.log(domainObject.datos());
        return await this.#dao.create(domainObject.datos());

    }

    async readOne(query, options) {
        return await this.#dao.readOne(query);
    }

    async readMany(query, options) {
        return await this.#dao.readMany(query);
    }

    async updateOne(query, newData, options) {
        const daoUpdated = await this.#dao.updateOne(query, newData);
        return daoUpdated;
    }

    async findOneAndUpdate(query, newData, options) {
        const daoUpdated = await this.#dao.findOneAndUpdate(query, newData);
        const domainUpdated = new this.#domainModel(daoUpdated);
        return domainUpdated;
    }

    async updateMany(query, newData, options) {
        return await this.#dao.updateMany(query, newData);
    }

    async deleteOne(query, options) {
        return await this.#dao.deleteOne(query);
    }

    async deleteMany(query, options) {
        return await this.#dao.deleteMany(query);
    }
}
