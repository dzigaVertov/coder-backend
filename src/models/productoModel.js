import { randomUUID } from 'crypto';
import * as valid from '../utils/validacion.js';

export class Producto {
    #title
    #description
    #price
    #thumbnail
    #stock
    #category
    #status
    #productCode

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
        this.#category = valid.soloAlfabetico(valid.noVacio(category));
        this.#status = status;
        this.#productCode = randomUUID();
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
            productCode: this.#productCode
        };
    }
}
