import { Router } from 'express';
import { usuarioModel } from '../models/schemaUsuario.js';

const apiSessionsRouter = Router();

export default apiSessionsRouter;

apiSessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const usuarioEncontrado = await usuarioModel.findOne({ email: email }).lean();

    if (!usuarioEncontrado) return res.sendStatus(401); // Unauthorized
    if (usuarioEncontrado.password !== password) return res.sendStatus(401);

    req.session.user = {
        nombre: usuarioEncontrado.first_name + ' ' + usuarioEncontrado.last_name,
        email: usuarioEncontrado.email,
        edad: usuarioEncontrado.age
    };

    console.log(req.session.user);

    res.status(201).json(req.session.user);
})

apiSessionsRouter.post('/registro', async (req, res) => {
    const datosUsuario = req.body;
    console.log(datosUsuario);

    const usuarioYaExiste = await usuarioModel.findOne({ email: datosUsuario.email }).lean();

    if (usuarioYaExiste) {
        console.log('El usuario ya existe!!!!!');
        return res.sendStatus(400)
    }

    const respuestaDb = await usuarioModel.create(datosUsuario);

    res.sendStatus(201);
})


