import { hashear, encriptarJwt } from '../utils/criptografia.js';
import { cartRepository } from '../repositories/cartRepository.js';
import { usersRepository } from '../repositories/userRepository.js';

export async function construirJwt(datosUsuario) {
    const jwtoken = encriptarJwt(datosUsuario);
    return jwtoken;
}

export async function registrarUsuario(datosUsuario) {
    datosUsuario.password = hashear(datosUsuario.password);

    let nuevoUsuario = await usersRepository.create(datosUsuario);
    const cartNuevoUsuario = await cartRepository.create(nuevoUsuario._id);
    nuevoUsuario = await usersRepository.findOneAndUpdate({_id: nuevoUsuario._id},{cart: cartNuevoUsuario._id});
    return nuevoUsuario;
}
