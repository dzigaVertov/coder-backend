import { usersRepository } from '../repositories/userRepository.js';
import { construirJwt } from './sessionServices.js';
import Usuario from '../models/userModel.js';
import { emailService } from './emailService.js';
import { chequearPassword, hashear } from '../utils/criptografia.js';
import { RepeatedPasswordError } from '../models/errors/RepeatedPassword.error.js';
import { PASSWORD_RESET_EXP_TIME } from '../config/auth.config.js';

class UserService {

    async sendResetPassMail(email) {
        let datosUsuario = await usersRepository.readOne({ email: email });
        const options = { expiresIn: PASSWORD_RESET_EXP_TIME };
        let jwt = await construirJwt(datosUsuario, options);
        emailService.sendPwdReset(email, jwt);
    }

    async resetPassword(user, newPass) {
        if (chequearPassword(newPass, user.password)) {
            throw new RepeatedPasswordError('Password ya utilizado');
        }
        const newPassHasheado = hashear(newPass);
        const updated = await usersRepository.updateOne({ email: user.email }, { password: newPassHasheado });
        console.log('updated: ', updated);
        return updated;
    }
}

export const userService = new UserService();

