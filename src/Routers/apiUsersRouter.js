import { Router } from 'express';
import * as usersController from '../controllers/userController.js';

const apiUsersRouter = Router();
export default apiUsersRouter;


apiUsersRouter.post('/', usersController.postUserController);

apiUsersRouter.get('/:uid', usersController.getUserController);

// TODO: agregar ruta de obtener usuario por búsqueda en el body
// TODO: agregar ruta de borrar usuario
// TODO: agregar ruta de update usuario
// TODO: agregar ruta de obtener todos los usuarios
