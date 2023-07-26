import assert, { equal } from 'node:assert';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { usersDaoMongoose } from '../../src/DAO/usersDaoMongoose.js';
import { USUARIO_TEST, USUARIO_TEST_2 } from '../../src/models/userModel.js';
import { crearMockProducto } from '../../src/mocks/productMock.js';
import { managerProductosMongo } from '../../src/DAO/ProductManagerMongo.js';
import { fetchFromMongoDb } from '../../src/utils/mongooseUtils.js';
import { PRODUCTO_TEST } from '../../src/models/productoModel.js';


const httpClient = supertest('http://localhost:8080');

describe('api rest', () => {

    describe('/api/users', () => {

        beforeEach(async () => {
            const result = await usersDaoMongoose.deleteMany({});
        });

        afterEach(async () => {
            const result = await usersDaoMongoose.deleteMany({});
        });

        describe('POST', () => {
            describe('Envío de petición con input correcto', () => {
                it('Creación de usuario, status: 201, body:dto', async () => {

                    const response = await httpClient.post('/api/users').send(USUARIO_TEST.inputCorrecto);
                    assert.equal(response.statusCode, 201);
                    assert.deepEqual(USUARIO_TEST.dto, response.body);

                });
            });

            describe('Envío de petición con input incorrecto', () => {
                it('devuelve error - statusCode: 400', async () => {
                    const response = await httpClient.post('/api/users').send(USUARIO_TEST.mailIncorrecto);
                    assert.equal(response.statusCode, 400);
                });
            });
        });

        describe('GET userId', () => {
            beforeEach(async () => {
                const datosUsuario = USUARIO_TEST.inputCorrecto;
                const resultado = await usersDaoMongoose.create(datosUsuario);
            });
            describe('Envío de petición con id en req params:', () => {
                it('Devuelve dto de usuario y statusCode 200', async () => {
                    const urlstring = '/api/users/' + USUARIO_TEST.inputCorrecto.id;
                    const response = await httpClient.get(urlstring);
                    assert.equal(response.statusCode, 200);
                    assert.deepEqual(response.body, USUARIO_TEST.datos);
                });
            });

        });
    });

    describe('/api/sessions', () => {
        let cookie;
        beforeEach(async () => {
            await usersDaoMongoose.deleteMany({});
            await httpClient.post('/api/users').send(USUARIO_TEST.inputCorrecto);
        });

        afterEach(async () => {
            await usersDaoMongoose.deleteMany({});
        });

        describe('login', () => {
            it('Debe loguear correctamente al usuario y Devolver una cookie', async () => {
                const datosLogin = {
                    email: USUARIO_TEST.inputCorrecto.email,
                    password: USUARIO_TEST.inputCorrecto.password
                };
                const result = await httpClient.post('/api/sessions/login').send(datosLogin);
                const cookieResult = result.headers['set-cookie'][0];
                assert.ok(cookieResult);
                cookie = {
                    name: cookieResult.split('=')[0],
                    value: cookieResult.split('=')[1]
                };

                assert.ok(cookie.name);
                assert.equal(cookie.name, 'jwt');
                assert.ok(cookie.value);
            });

        });

        describe('current', () => {
            it('Envía la cookie que contiene el jwt y desestructura el usuario correctamente', async () => {
                const { _body } = await httpClient.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);
                assert.equal(_body.email, USUARIO_TEST.inputCorrecto.email);
            });

            it('Devuelve status:401 Unauthorized si el jwt está adulterado, un estado de error', async () => {
                const response = await httpClient.get('/api/sessions/current').set('Cookie', [`${cookie.name}=ñdlk3jfs309fsñdj33o4ijdsñkj33ñsdkjfijsñjef`]);
                assert.equal(response.statusCode, 401);
                assert.ok(!response.body.email);
            });


        });

        describe('logout', () => {
            it('Elimina la cookie que contiene el jwt, status: 200', async () => {
                const response = await httpClient.get('/api/sessions/logout').set('Cookie', [`${cookie.name}=${cookie.value}`]);

                assert.equal(response.statusCode, 200);

                const cookieResult = response.headers['set-cookie'][0];
                cookie = {
                    name: cookieResult.split('=')[0],
                    value: cookieResult.split('=')[1]
                };

                const { _body } = await httpClient.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);
                assert.ok(!_body.email);
            });
        });

    });

    describe.only('/api/products', () => {
        before(async () => {
            const productos = crearMockProducto(30);
            for (const pr of productos) {
                await managerProductosMongo.addProduct(pr);
            }
        });

        after(async () => {
            await managerProductosMongo.deleteMany({});
        });

        describe('GET', () => {
            it('Devuelve una lista de productos con informacion de paginacion, statusCode:200', async () => {
                const response = await httpClient.get('/api/products');
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.totalDocs, 30);
            });

            it('Devuelve productos de una categoría seleccionada por query params', async () => {
                const response = await httpClient.get('/api/products/?category=muebles');
                assert.equal(response.statusCode, 200);
                response.body.docs.forEach(elem => assert.equal(elem.category, 'muebles'));
            });

            it('Devuelve un producto a partir de la id pasada en req.params, statusCode:200', async () => {
                await managerProductosMongo.addProduct(PRODUCTO_TEST.inputCorrecto);

                const url = '/api/products/' + PRODUCTO_TEST.inputCorrecto.id;
                const response = await httpClient.get(url);
                assert.equal(response.statusCode, 200);
                assert.deepEqual(PRODUCTO_TEST.inputCorrecto, response.body);
            });

            it('Devuelve StatusCode 404 si el producto no existe', async () => {
                const response = await httpClient.get('/api/products/cumbiancha');
                assert.equal(response.statusCode, 404);
            });

        });

    });
});

