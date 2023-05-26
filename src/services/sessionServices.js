import { hashear, encriptarJwt } from '../utils/criptografia.js';
import { usuarioModel } from '../models/schemaUsuario.js';

export async function construirJwt(req) {
    const currentUser = req.user;
    const jwtoken = encriptarJwt(currentUser);
    return jwtoken;
}

export async function registrarUsuario(datosUsuario) {
    const usuarioYaExiste = await usuarioModel.findOne({ email: datosUsuario.email }).lean();

    if (usuarioYaExiste) {
        console.log('El usuario ya existe!!!!!');
        console.log(usuarioYaExiste);
        throw( new Error('usuario ya existe'));
    }
    datosUsuario.password = hashear(datosUsuario.password);
    const respuestaDb = await usuarioModel.create(datosUsuario);
}
