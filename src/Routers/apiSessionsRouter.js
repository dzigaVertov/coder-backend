import { Router } from 'express';
import { usuarioModel } from '../models/schemaUsuario.js';
import { autenticarLocal, autenticarJwtApi } from '../middlewares/passport.js';
const apiSessionsRouter = Router();
import { hashear } from '../utils/criptografia.js';

export default apiSessionsRouter;


apiSessionsRouter.post('/login', autenticarLocal, (req, res) => {
    console.log('todook');
    res.status(201).json
})

apiSessionsRouter.post('/registro', async (req, res) => {
    const datosUsuario = req.body;

    const usuarioYaExiste = await usuarioModel.findOne({ email: datosUsuario.email }).lean();

    if (usuarioYaExiste) {
        console.log('El usuario ya existe!!!!!');
        return res.sendStatus(400)
    }

    datosUsuario.password = hashear(datosUsuario.password);
    const respuestaDb = await usuarioModel.create(datosUsuario);
    console.log(datosUsuario);
    res.sendStatus(201);
})


