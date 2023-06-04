class Usuario {
    #first_name;
    #last_name;
    #email;
    #age;
    #password;
    #role;

    constructor({ first_name, last_name, email, age, password, cartId, role }) {
        this.#first_name = first_name;
        this.#last_name = last_name;
        this.#email = email;
        this.#age = age;
        this.#password = password;
        this.#role = role;
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
