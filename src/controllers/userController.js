import { usersRepository } from '../repositories/userRepository.js';
import { construirJwt } from '../services/sessionServices.js';


export async function postUserController(req, res, next) {
    const datosUsuario = req.body;

    try {
        const usuario = await usersRepository.create(datosUsuario);
        const jwtoken = await construirJwt(usuario);
        req.logger.info(`Creado jwtoken en postUserController - ${new Date().toLocaleString()}`);
        res.cookie('jwt', jwtoken, { maxAge: 100000, httpOnly: true, signed: true });
        res.sendStatus(201);

    } catch (error) {
        req.logger.error(`Error: ${error.message} atrapado en postUserController `);
        next(error);
    }
}

export async function getUserController(req, res, next) {
    try {
        const uid = req.params.uid;
        const usuario = await usersRepository.readOne({ id: uid });
        req.logger.debug(`usuario leído en getUserController - ${new Date().toLocaleString()}`);

        res.status(201).json(usuario);
    } catch (error) {
        req.logger.error(`Error: ${error.message} atrapado en getUserController `);
        next(error);
    }

}
