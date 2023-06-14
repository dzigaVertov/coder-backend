import { faker } from '@faker-js/faker';
import { Producto } from '../models/productoModel.js'

export function crearMockProducto(cantidad = 1) {
    let productos = [];
    for (let i = 0; i < cantidad; i++) {
        let prod = new Producto(faker.lorem.sentence(),
                                faker.lorem.paragraph(),
                                faker.finance.amount(),
                                faker.image.url(),
                                faker.number.int(),
                                faker.lorem.word(),
                                'available');

        productos.push(prod);
    }

    return productos;
}

