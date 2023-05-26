import { Router } from 'express';
import { autenticarLocal, autenticarJwtApi } from '../middlewares/passport.js';
import { hashear, encriptarJwt } from '../utils/criptografia.js';
import { usuarioModel } from '../models/schemaUsuario.js';
import { construirJwt, registrarUsuario } from '../services/sessionServices.js';

export const handleLogin = Router();
handleLogin.use(autenticarLocal, async (req, res) => {
    const jwtoken = await construirJwt(req);
    res.cookie('jwt', jwtoken, { maxAge: 100000, httpOnly: true, signed: true });
    res.sendStatus(201);
});


export async function handleRegistro(req, res, next) {
    const datosUsuario = req.body;
    try {
        await registrarUsuario(datosUsuario);
        const jwtoken = await construirJwt
    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }
    
    const jwtoken = encriptarJwt(datosUsuario);
    res.cookie('jwt', jwtoken, { maxAge: 100000, httpOnly: true, signed: true });
    res.sendStatus(201);
}

export const handleLogout = Router();
handleLogout.use(autenticarJwtApi, (req, res) => {
    res.clearCookie('jwt', { maxAge: 100000, httpOnly: true, signed: true });
    res.sendStatus(200);
});

export const handleGetCurrent = Router();
handleGetCurrent.use(autenticarJwtApi, (req, res) => {
    const currentUser = req.user;
    delete currentUser.password;
    res.json(currentUser);
});
