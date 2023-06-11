import { randomUUID } from 'crypto';
import * as valid from '../utils/validacion.js';

export class Cart {
    #cartOwner;
    #cartCode;
    #productos;

    constructor(owner) {
        this.#cartOwner = valid.noVacio(owner);
        this.#productos = [];
        this.#cartCode = randomUUID();
    }

    datos() {
        return {
            cartOwner: this.#cartOwner,
            productos: this.#productos,
            cartCode: this.#cartCode
        };
    }
}
