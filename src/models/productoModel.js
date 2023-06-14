bimport { randomUUID } from 'crypto';
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

        this.#title = valid.soloAlfabetico(valid.noVacio(title));
        this.#description = valid.soloAlfabetico(valid.noVacio(description));
        this.#price = valid.positivo(valid.noVacio(price));
        this.#thumbnail = thumbnail;
        this.#stock = valid.positivo(stock);
        this.#category = valid.soloAlfabetico(valid.noVacio(category));
        this.#status = status;
        this.#productCode = randomUUID();
    }
}
