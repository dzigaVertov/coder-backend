import * as valid from '../utils/validacion.js';
import { randomUUID } from 'crypto';

export default class Usuario {
    #first_name;
    #last_name;
    #email;
    #age;
    #password;
    #role;
    #id;
    #cart;

    constructor({ first_name, last_name, email, age, password, role, cart }) {
        this.#first_name = valid.soloAlfabetico(valid.noVacio(first_name));
        this.#last_name = valid.soloAlfabetico(valid.noVacio(last_name));
        this.#email = valid.esMail(valid.noVacio(email));
        this.#password = valid.noVacio(password);
        this.#role = valid.esRole(role);
        age = parseInt(age);
        this.#age = valid.positivo(valid.entero(valid.noVacio(age)));
        this.#id = randomUUID();
        this.#cart = cart;
    }

    get_email() { return this.#email; }
    get_password() { return this.#password; }
    get_last_name() { return this.#last_name; }
    get_first_name() { return this.#first_name; }
    get_age() { return this.#age; }
    get_role() { return this.#role; }
    get_id() { return this.#id; }

    set_role(newRole) {
        if (!valid.esRole(newRole)) throw new Error('No es rol válido');

        this.#role = role;
    }

    datos() {
        return {
            first_name: this.#first_name,
            last_name: this.#last_name,
            email: this.#email,
            password: this.#password,
            age: this.#age,
            role: this.#role,
            id: this.#id,
            cart: this.#cart
        };
    }

    dto() {
        return {
            first_name: this.#first_name,
            last_name: this.#last_name,
            email: this.#email,
            age: this.#age,
            role: this.#role,
            id: this.#id,
            cart: this.#cart
        };
    }
}

export const USUARIO_TEST = {
    inputCorrecto: {
        first_name: 'Marcelo',
        last_name: 'Ortega',
        email: 'marceloortega@gmail.com',
        age: 75,
        role: 'user',
        password: '123',
        id: 'abc23-34'
    },
    rolIncorrecto: {
        first_name: 'Marcelo',
        last_name: 'Ortega',
        email: 'marceloortega@gmail.com',
        age: 75,
        role: 'hacker',
        password: '123',
        id: 'abc23-34'
    },
    mailIncorrecto: {
        first_name: 'Marcelo',
        last_name: 'Ortega',
        email: 'www.google.com',
        age: 75,
        role: 'user',
        password: '123',
        id: 'abc23-34'
    },
    ageIncorrecto: {
        first_name: 'Marcelo',
        last_name: 'Ortega',
        email: 'marceloortega@gmail.com',
        age: 'viejito',
        role: 'user',
        password: '123'
    },
    dto: {
        first_name: 'Marcelo',
        last_name: 'Ortega',
        email: 'marceloortega@gmail.com',
        role: 'user'
    },
    datos: {
        first_name: 'Marcelo',
        last_name: 'Ortega',
        email: 'marceloortega@gmail.com',
        age: 75,
        role: 'user',
        password: '123',
        id: 'abc23-34'
    }

}


export const USUARIO_TEST_2 = {
    inputCorrecto: {
        first_name: 'Bruno',
        last_name: 'Lopez',
        email: 'brunolopez@gmail.com',
        age: 75,
        role: 'user',
        password: '123',
        id: 'abc23-asgge34'
    },
    rolIncorrecto: {
        first_name: 'Bruno',
        last_name: 'Lopez',
        email: 'brunolopez@gmail.com',
        age: 75,
        role: 'hacker',
        password: '123',
        id: 'abc23-asgge34'
    },
    mailIncorrecto: {
        first_name: 'Bruno',
        last_name: 'Lopez',
        email: 'www.google.com',
        age: 75,
        role: 'user',
        password: '123',
        id: 'abc23-asgge34'
    },
    ageIncorrecto: {
        first_name: 'Bruno',
        last_name: 'Lopez',
        email: 'brunolopez@gmail.com',
        age: 'viejito',
        role: 'user',
        password: '123',
        id: 'abc23-asgge34'
    },
    dto: {
        first_name: 'Bruno',
        last_name: 'Lopez',
        email: 'brunolopez@gmail.com',
        role: 'user'
    },
    datos: {
        first_name: 'Bruno',
        last_name: 'Lopez',
        email: 'brunolopez@gmail.com',
        age: 75,
        role: 'user',
        password: '123',
        id: 'abc23-asgge34'
    }

}


