import * as valid from '../utils/validacion.js';

export default class Usuario {
    #first_name;
    #last_name;
    #email;
    #age;
    #password;
    #role;

    constructor({ first_name, last_name, email, age, password, role }) {
        this.#first_name = valid.soloAlfabetico(valid.noVacio(first_name));
        this.#last_name = valid.soloAlfabetico(valid.noVacio(last_name));
        this.#email = valid.esMail(valid.noVacio(email));
        this.#age = valid.positivo(valid.entero(valid.noVacio(age)));
        this.#password = valid.noVacio(password);
        this.#role = valid.esRole(valid.noVacio(role));
    }

    get email() { return this.#email }
    get password() { return this.#password }
    get last_name() { return this.#last_name }
    get first_name() { return this.#first_name }
    get age() { return this.#age }
    get role() { return this.#role }

    datos() {
        return {
            first_name: this.#first_name,
            last_name: this.#last_name,
            email: this.#email,
            password: this.#password,
            age: this.#age,
            role: this.#role
        }
    }
}


