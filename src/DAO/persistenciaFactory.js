import { PERSISTENCIA } from '../config/database.config.js';

let usersDao;
let cartsDao;
if (PERSISTENCIA === 'mongoose') {
    const { usersDaoMongoose } = await import('../DAO/usersDaoMongoose.js');
    const { cartManagerMongo } = await import('../DAO/CartManagerMongo.js');
    usersDao = usersDaoMongoose;
    cartsDao = cartManagerMongo;
} else {
    throw new Error('Error de tipo de persistencia.  Opciones disponibles: mongoose');
}

export { usersDao, cartsDao };
