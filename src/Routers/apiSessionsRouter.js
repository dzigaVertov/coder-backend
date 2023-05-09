import { Router } from 'express';
import { usuarioModel } from '../models/schemaUsuario.js';
import { autenticarLocal, autenticarJwtApi } from '../middlewares/passport.js';
const apiSessionsRouter = Router();
import { hashear, encriptarJwt } from '../utils/criptografia.js';

export default apiSessionsRouter;


apiSessionsRouter.post('/login', autenticarLocal, (req, res) => {

    const currentUser = req.user;
    const jwtoken = encriptarJwt(currentUser);
    res.cookie('jwt', jwtoken, {maxAge:100000, httpOnly:true, signed:true});
    res.sendStatus(201);
});

apiSessionsRouter.post('/registro', async (req, res) => {
    const datosUsuario = req.body;

    const usuarioYaExiste = await usuarioModel.findOne({ email: datosUsuario.email }).lean();

    if (usuarioYaExiste) {
        console.log('El usuario ya existe!!!!!');
        return res.sendStatus(400);
    }

    datosUsuario.password = hashear(datosUsuario.password);
    const respuestaDb = await usuarioModel.create(datosUsuario);
    const jwtoken = encriptarJwt(datosUsuario);
    res.cookie('jwt', jwtoken, {maxAge:100000, httpOnly:true, signed:true});
    res.sendStatus(201);
});

apiSessionsRouter.post('/logout', autenticarJwtApi, (req, res)=>{
    res.clearCookie('jwt', {maxAge:100000, httpOnly:true, signed:true});
    res.sendStatus(200);
});

apiSessionsRouter.get('/current', autenticarJwtApi, (req, res)=> {
    const currentUser = req.user;
    delete currentUser.password;
    res.json(currentUser);
});


