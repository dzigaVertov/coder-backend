import { Router } from 'express';
import { autenticarLocal, autenticarJwtApi } from '../middlewares/passport.js';
import { hashear, encriptarJwt } from '../utils/criptografia.js';
import { usuarioModel } from '../models/schemaUsuario.js';

export const handleLogin = Router();
handleLogin.use(autenticarLocal, (req, res) => {
    const currentUser = req.user;
    const jwtoken = encriptarJwt(currentUser);
    res.cookie('jwt', jwtoken, { maxAge: 100000, httpOnly: true, signed: true });
    res.sendStatus(201);
});


export async function handleRegistro(req, res, next) {
    const datosUsuario = req.body;
    const usuarioYaExiste = await usuarioModel.findOne({ email: datosUsuario.email }).lean();

    if (usuarioYaExiste) {
        console.log('El usuario ya existe!!!!!');
        return res.sendStatus(400);
    }
    datosUsuario.password = hashear(datosUsuario.password);
    const respuestaDb = await usuarioModel.create(datosUsuario);
    const jwtoken = encriptarJwt(datosUsuario);
    res.cookie('jwt', jwtoken, { maxAge: 100000, httpOnly: true, signed: true });
    res.sendStatus(201);
}

export const handleLogout = Router();
handleLogout.use(autenticarJwtApi, (req, res)=>{
    res.clearCookie('jwt', {maxAge:100000, httpOnly:true, signed:true});
    res.sendStatus(200);
});

export const handleGetCurrent = Router();
handleGetCurrent.use(autenticarJwtApi, (req, res)=> {
    const currentUser = req.user;
    delete currentUser.password;
    res.json(currentUser);
});
