import { usersRepository } from '../repositories/userRepository.js';
import { construirJwt } from './sessionServices.js';
import Usuario from '../models/userModel.js';
import { emailService } from './emailService.js'

class UserService {

    async resetPassword(email) {
        let datosUsuario = await usersRepository.readOne({ email: email });
        let horaCreacion = new Date().toDateString();
        datosUsuario['tokenTime'] = horaCreacion;
        let jwt = construirJwt(datosUsuario);
        emailService.sendPwdReset(email, jwt);
    }
}

export const userService = new UserService();

