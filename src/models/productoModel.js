import { randomUUID } from 'crypto';
import * as valid from '../utils/validacion.js';
import { InvalidArgumentError } from './errors/InvalidArgument.error.js';

export class Producto {
    #title
    #description
    #price
    #thumbnail
    #stock
    #category
    #status
    #id

    constructor(title,
        description,
        price,
        thumbnail,
        stock,
        category,
        status) {


        this.#title = valid.soloAlfabeticoYpuntuacion(valid.noVacio(title));
        this.#description = valid.soloAlfabeticoYpuntuacion(valid.noVacio(description));
        this.#price = valid.positivo(valid.noVacio(price));
        this.#thumbnail = thumbnail;
        this.#stock = valid.positivo(stock);
        this.#category = validarCategory(category);
        this.#status = status;
        this.#id = randomUUID();
    }

    datos() {
        return {
            title: this.#title,
            description: this.#description,
            price: this.#price,
            thumbnail: this.#thumbnail,
            stock: this.#stock,
            category: this.#category,
            status: this.#status,
            id: this.#id
        };
    }
}

function validarCategory(category) {
    const categoryOptions = ['bebidas', 'computacion', 'frutas', 'muebles'];
    if (!categoryOptions.includes(category)) throw new InvalidArgumentError(`Categoría inválida: ${category}`);

    return category;
}
