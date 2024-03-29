import { usersRepository } from '../repositories/userRepository.js';
import { cartService } from '../services/cartService.js';
import { construirJwt } from '../services/sessionServices.js';
import { userService } from '../services/userService.js';
import { toPojo } from '../utils/topojo.js';

export async function postUserController(req, res, next) {

    try {
        const datosUsuario = req.body;
        const usuario = toPojo(await userService.crearUsuario(datosUsuario));

        const jwtoken = await construirJwt(usuario);
        req.logger.info(`Creado jwtoken en postUserController - ${new Date().toLocaleString()}`);
        res.cookie('jwt', jwtoken, { maxAge: 100000, httpOnly: true, signed: true });
        res.status(201).json(usuario);

    } catch (error) {
        req.logger.error(`Error: ${error.message} atrapado en postUserController `);
        next(error);
    }
}

export async function postUserSendLinkController(req, res, next) {
    const datosUsuario = req.body;
    try {
        const email = datosUsuario.email;
        userService.sendResetPassMail(email);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }

}

export async function postAddToCartController(req, res, next) {
    try {
        const pid = req.params.pid;
        const user = req.user;
        const cartId = user.cartId;
        cartService.agregarProducto(cartId, pid);
        res.status(201);

    } catch (error) {
        next(error);
    }

}

export async function postUserNewPassController(req, res, next) {
    try {
        const datosUsuario = req.user;
        const newPass = req.body.password;
        const passwordActualizado = await userService.resetPassword(datosUsuario, newPass);
        // logging out the user:
        res.clearCookie('jwt', { maxAge: 100000, httpOnly: true, signed: true });
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }

}

export async function getUserController(req, res, next) {
    try {
        const uid = req.params.uid;
        const usuario = await usersRepository.readOne({ id: uid });
        req.logger.debug(`usuario leído en getUserController - ${new Date().toLocaleString()}`);
        res.status(200).json(usuario);
    } catch (error) {
        req.logger.error(`Error: ${error.message} atrapado en getUserController `);
        next(error);
    }

}
