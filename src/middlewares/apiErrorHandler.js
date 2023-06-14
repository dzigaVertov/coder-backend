import { InvalidArgumentError } from '../models/errors/InvalidArgument.error.js';
import { NotFoundError } from '../models/errors/NotFound.error.js';

export async function apiErrorHandler(error, req, res, next) {
    switch (true) {
        case error instanceof InvalidArgumentError:
            res.status(400);
        case error instanceof NotFoundError:
            res.status(404);

        default:
            res.json({ estado: 'error', tipo: error.tipo, descripcion: error.description });


    }
}
