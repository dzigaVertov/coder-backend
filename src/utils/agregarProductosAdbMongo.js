import mongoose from '../../src/database/mongoose.js';
import { managerProductosMongo } from "../../src/DAO/ProductManagerMongo.js";
import { crearMockProducto } from "../../src/mocks/productMock.js";

async function cargarProductosEnLaBase(cantidad = 1) {
    const productos = crearMockProducto(cantidad);

    for (const pr of productos) {
        await managerProductosMongo.addProduct(pr);
    };
    console.log('terminado');
    return process.exit();
}
const numDocs = parseInt(process.argv[2]);
await cargarProductosEnLaBase(numDocs);
