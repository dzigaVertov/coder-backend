import { usersRepository } from '../repositories/userRepository.js';
import { construirJwt } from '../services/sessionServices.js';


export async function postUserController(req, res, next) {
    const datosUsuario = req.body;

    try {
        const usuario = usersRepository.create(datosUsuario);
        const jwtoken = await construirJwt(usuario);
        res.cookie('jwt', jwtoken, { maxAge: 100000, httpOnly: true, signed: true });
        res.sendStatus(201);

    } catch (error) {
        next(error);
    }


}
