import assert from 'node:assert';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { usersDaoMongoose } from '../../src/DAO/usersDaoMongoose.js';
import { USUARIO_TEST, USUARIO_TEST_2 } from '../../src/models/userModel.js';

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

        describe('GET', ()=> {
            before(async ()=> {
                const datosUsuario = USUARIO_TEST.inputCorrecto;
                await usersDaoMongoose.create(datosUsuario);
            });
            
        });
    });
});
