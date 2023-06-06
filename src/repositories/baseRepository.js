export class BaseRepository {
  #dao
  oconstructor(dao) {
    this.#dao = dao
  }

  get dao() { return this.#dao }

  create(data, options) {
    return this.#dao.create(data)
  }

  readOne(query, options) {
    return this.#dao.readOne(query)
  }

  readMany(query, options) {
    return this.#dao.readMany(query)
  }

  updateOne(query, newData, options) {
    return this.#dao.updateOne(query, newData)
  }

  updateMany(query, newData, options) {
    return this.#dao.updateMany(query, newData)
  }

  deleteOne(query, options) {
    return this.#dao.deleteOne(query)
  }

  deleteMany(query, options) {
    return this.#dao.deleteMany(query)
  }
}
