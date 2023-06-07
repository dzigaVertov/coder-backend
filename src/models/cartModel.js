import { randomUUID } from 'crypto';
import * as valid from '../utils/validacion.js';

export class Cart {
    #cartOwner;
    #cartCode;
    #productos;

    constructor(owner){
        this.#cartOwner = valid.esMail(valid.noVacio(owner));
        this.#productos = [];
        this.#cartCode = randomUUID();
    }
}
