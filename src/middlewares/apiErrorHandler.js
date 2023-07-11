import { InvalidArgumentError } from '../models/errors/InvalidArgument.error.js';
import { NotFoundError } from '../models/errors/NotFound.error.js';
import { RepeatedPasswordError } from '../models/errors/RepeatedPassword.error.js';

export async function apiErrorHandler(error, req, res, next) {

    switch (true) {
        case error instanceof InvalidArgumentError:
            res.status(400);
            return;
        case error instanceof NotFoundError:
            res.status(404);
            return;
        case error instanceof RepeatedPasswordError:
            req.logger.debug('Redirecting in apiErrorHandler');
            res.redirect(307, '/login');
            return;


        default:
            res.json({ estado: 'error', tipo: error.tipo, descripcion: error.description });


    }
}
