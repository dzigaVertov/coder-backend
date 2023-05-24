import { Router } from 'express';
import * as sessionController from '../controllers/sessionController.js';

const apiSessionsRouter = Router();
export default apiSessionsRouter;


apiSessionsRouter.post('/login', sessionController.handleLogin);

apiSessionsRouter.post('/registro', sessionController.handleRegistro);

apiSessionsRouter.post('/logout', sessionController.handleLogout);

apiSessionsRouter.get('/current', sessionController.handleGetCurrent);


