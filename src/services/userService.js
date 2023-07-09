import { usersRepository } from '../repositories/userRepository.js';
import { construirJwt } from './sessionServices.js';
import Usuario from '../models/userModel.js';
import { emailService } from './emailService.js';
import { chequearPassword, hashear } from '../utils/criptografia.js';

class UserService {

    async sendResetPassMail(email) {
        let datosUsuario = await usersRepository.readOne({ email: email });
        const options = { expiresIn: 6000 };
        let jwt = await construirJwt(datosUsuario, options);
        emailService.sendPwdReset(email, jwt);
    }

    async resetPassword(user, newPass) {
        if (chequearPassword(newPass, user.password)) {
            throw new Error('El password no puede ser el ya utilizdo');
        }
        const newPassHasheado = hashear(newPass);
        const updated = usersRepository.updateOne({ email: user.email }, { password: newPassHasheado });
        return updated;
    }
}

export const userService = new UserService();

