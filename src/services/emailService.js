import { createTransport } from 'nodemailer';
import { EMAIL_CONFIG } from '../config/email.config.js';
import { construirJwt } from './sessionServices.js';


class EmailService {
    #clienteNodemailer

    constructor(config) {
        this.#clienteNodemailer = createTransport(config);
    }

    async send(from, destinatario, subject, mensaje) {
        const mailOptions = {
            from: from,
            to: destinatario,
            subject: subject,
            mensaje: mensaje
        }

        try {
            const info = await this.#clienteNodemailer.sendMail(mailOptions);
            return info;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async sendPwdReset(emailUsuario, jwt) {

    }

}


export const emailService = new EmailService(EMAIL_CONFIG);
