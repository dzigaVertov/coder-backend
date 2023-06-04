import { PERSISTENCIA } from '../config/database.config.js';

let usersDao;
if (PERSISTENCIA === 'mongoose') {
    const { usersDaoMongoose } = await import('../DAO/usersDaoMongoose.js');
    usersDao = usersDaoMongoose;
} else {
    throw new Error('Error de tipo de persistencia.  Opciones disponibles: mongoose');
}

export { usersDao };
