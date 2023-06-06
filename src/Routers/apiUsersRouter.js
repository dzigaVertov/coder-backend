import { Router } from 'express';
import * as usersController from '../controllers/userController.js';

const apiUsersRouter = Router();
export default apiUsersRouter;


apiUsersRouter.post('/', usersController.postUserController);
