import { Router } from 'express';
import * as usersController from '../controllers/userController.js';
import { autenticarJwtApi } from '../middlewares/passport.js';

const apiUsersRouter = Router();
export default apiUsersRouter;

function middlePrueba(req, res, next) {
    console.log('llega la peticion', req);
    next();
}

apiUsersRouter.post('/', usersController.postUserController);

apiUsersRouter.post('/sendLink', usersController.postUserSendLinkController);

apiUsersRouter.post('/newpassword', middlePrueba, autenticarJwtApi, usersController.postUserNewPassController);

apiUsersRouter.get('/:uid', usersController.getUserController);

// TODO: agregar ruta de obtener usuario por búsqueda en el body
// TODO: agregar ruta de borrar usuario
// TODO: agregar ruta de update usuario
// TODO: agregar ruta de obtener todos los usuarios
