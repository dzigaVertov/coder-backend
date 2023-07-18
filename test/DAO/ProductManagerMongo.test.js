import { after, before, beforeEach, describe, it } from "mocha";
import { managerProductosMongo } from '../../src/DAO/ProductManagerMongo.js';
import mongoose from "mongoose";
import assert from 'node:assert';
import { fetchFromMongoDb, insertIntoMongoDb } from '../../src/utils/mongooseUtils.js';
import { USUARIO_TEST, USUARIO_TEST_2 } from '../../src/models/userModel.js'
import { InvalidOperationError } from "../../src/models/errors/InvalidOperation.error.js";
import { InvalidArgumentError } from "../../src/models/errors/InvalidArgument.error.js";
import { NotFoundError } from "../../src/models/errors/NotFound.error.js";
import { PRODUCTO_TEST, PRODUCTO_TEST_2 } from "../../src/models/productoModel.js";


// before(async () => {

//     await mongoose.connect(MONGODB_STRING_CONEXION);
// })

// after(async () => {
//     await mongoose.connection.close();
// })




describe('DAO de Productos Mongoose', () => {
    beforeEach(async () => {
        await mongoose.connection.collection('productos').deleteMany({});
    })
    describe('addProduct', () => {
        describe('Agregado de un producto', () => {
            it('Lo Almacena - Lo Devuelve correctamente como objeto plano', async () => {
                const productoCreado = await managerProductosMongo.addProduct(PRODUCTO_TEST.inputCorrecto);
                assert.deepEqual(PRODUCTO_TEST.inputCorrecto, productoCreado);
                const productoGuardado = await fetchFromMongoDb(PRODUCTO_TEST.inputCorrecto, 'productos');
                assert.deepEqual(productoCreado, productoGuardado);
            })

            it('Lanza error si el input es incorrecto', async () => {
                await assert.rejects(managerProductosMongo.addProduct(PRODUCTO_TEST.priceincorrecto), err => err instanceof InvalidArgumentError);


            })
        })
    })

    describe('readOne', () => {
        it('Recupera un producto almacenado', async () => {
            await managerProductosMongo.addProduct(PRODUCTO_TEST.inputCorrecto);
            const productoRecuperado = await managerProductosMongo.readOne(PRODUCTO_TEST.inputCorrecto);
            assert.deepEqual(PRODUCTO_TEST.inputCorrecto, productoRecuperado);
        });

        it('Lanza un error NotFoundError si no encuentra el usuario', async () => {
            await assert.rejects(managerProductosMongo.readOne({ id: 'xxxxxxxxxxxxxxx' }), err => err instanceof NotFoundError);
        });
    })

    describe('readMany', () => {
        beforeEach(async () => {

            await managerProductosMongo.addProduct(PRODUCTO_TEST.inputCorrecto);
            await managerProductosMongo.addProduct(PRODUCTO_TEST_2.inputCorrecto);
        })
        it('Recupera productos según criterio, devuelve objetos planos sin campos extras', async () => {
            const productosRecuperados = await managerProductosMongo.readMany({ status: 'available' });
            assert.deepEqual([PRODUCTO_TEST.inputCorrecto, PRODUCTO_TEST_2.inputCorrecto], productosRecuperados);
        });

        it('Lanza un error NotFoundError si no encuentra usuarios', async () => {
            await assert.rejects(managerProductosMongo.readMany({ satus: 'excelsior' }), err => err instanceof NotFoundError);

        })
    })

    describe('updateProduct', () => {
        beforeEach(async () => {
            await managerProductosMongo.addProduct(PRODUCTO_TEST.inputCorrecto);
        });

        it('Actualiza los campos de un y solo un producto y lo devuelve actualizado', async () => {
            const title = PRODUCTO_TEST.inputCorrecto.title;
            const resultado = await managerProductosMongo.updateProduct({ title: title }, { price: 3000 });
            let actualizadoEnDb = await managerProductosMongo.readOne({ title: title });
            let actualizadoCorrecto = { ...PRODUCTO_TEST.inputCorrecto, price: 3000 };
            assert.deepEqual(actualizadoEnDb, actualizadoCorrecto);
            assert.deepEqual(resultado, actualizadoCorrecto);
        });

        it('Lanza un error NotFoundError si no encuentra el usuario', async () => {
            await assert.rejects(managerProductosMongo.updateProduct({ title: 'Pendorcho 1XP07' }, { price: 100 }), err => err instanceof NotFoundError);
        });
    })

    // describe('updateMany', () => {
    //     beforeEach(async () => {
    //         await usersDaoMongoose.create(USUARIO_TEST.inputCorrecto);
    //         await usersDaoMongoose.create(USUARIO_TEST_2.inputCorrecto);
    //     })
    //     it('Actualiza los campos de uno o más usuarios', async () => {
    //         const resultado = await usersDaoMongoose.updateMany({ role: "user" }, { first_name: 'Atahualpa' });
    //         assert.equal(resultado.matchedCount, 2);
    //         let actualizadoCorrecto1 = { ...USUARIO_TEST.inputCorrecto, first_name: 'Atahualpa' };
    //         let actualizadoCorrecto2 = { ...USUARIO_TEST_2.inputCorrecto, first_name: 'Atahualpa' };
    //         const recuperados = await usersDaoMongoose.readMany({ first_name: 'Atahualpa' }, 'usuarios');
    //         assert.deepEqual([actualizadoCorrecto1, actualizadoCorrecto2], recuperados);
    //     });
    //     it('Lanza un NotFoundError si no encuentra ningún usuario', async () => {
    //         assert.rejects(usersDaoMongoose.updateMany({ first_name: 'Fernandito' }, { last_name: 'De La Rúa' }), NotFoundError);
    //     });
    // })

    // describe('findOneAndUpdate', () => {
    //     beforeEach(async () => {
    //         await usersDaoMongoose.create(USUARIO_TEST.inputCorrecto);

    //     });

    //     it('Actualiza los campos de un y solo un usuario y lo devuelve actualizado', async () => {
    //         const name = USUARIO_TEST.inputCorrecto.first_name;
    //         const usuariodevuelto = await usersDaoMongoose.findOneAndUpdate({ first_name: name }, { age: 89 });
    //         let actualizadoEnDb = await fetchFromMongoDb({ first_name: name }, 'usuarios');
    //         let actualizadoCorrecto = { ...USUARIO_TEST.inputCorrecto, age: 89 };

    //         assert.deepEqual(actualizadoEnDb, actualizadoCorrecto);
    //         assert.deepEqual(usuariodevuelto, actualizadoCorrecto);

    //     });
    //     it('Lanza un error NotFoundError si no encuentra el usuario', async () => {
    //         assert.rejects(usersDaoMongoose.findOneAndUpdate({ first_name: 'Marilina' }, { age: 27 }), NotFoundError);
    //     });
    // });

    // describe('deleteOne', () => {
    //     beforeEach(async () => {
    //         await usersDaoMongoose.create(USUARIO_TEST.inputCorrecto);

    //     });

    //     it('Elimina un usuario de la base y lo devuelve', async () => {
    //         const nombre = USUARIO_TEST.inputCorrecto.first_name;
    //         const usuarioDevuelto = await usersDaoMongoose.deleteOne({ first_name: nombre });
    //         assert.deepEqual(usuarioDevuelto, USUARIO_TEST.inputCorrecto);
    //         assert.rejects(usersDaoMongoose.readOne({ first_name: nombre }), NotFoundError);
    //     })

    //     it('Lanza un error NotFoundError si no encuentra el usuario', async () => {
    //         assert.rejects(usersDaoMongoose.deleteOne({ first_name: 'xxxxxxxx' }), NotFoundError);
    //     })

    // });

    // describe('deleteMany', () => {
    //     beforeEach(async () => {
    //         await usersDaoMongoose.create(USUARIO_TEST.inputCorrecto);
    //         await usersDaoMongoose.create(USUARIO_TEST_2.inputCorrecto);
    //     })
    //     it('Elimina uno o más usuarios de la base', async () => {
    //         const result = await usersDaoMongoose.deleteMany({ role: 'user' });
    //         assert.equal(result.deletedCount, 2);
    //         assert.rejects(usersDaoMongoose.readMany({}), NotFoundError);
    //     })
    // });
})
