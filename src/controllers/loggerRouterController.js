import { NODE_ENV } from '../config/servidor.config.js';

export function getHandler(req, res, next) {
    const tipoLog = req.params.tipoLog;
    const levels = ['fatal', 'error', 'warning', 'info', 'http', 'debug'];
    if (levels.includes(tipoLog)) {
        req.logger[tipoLog](`Log de nivel ${tipoLog} generado en LoggerTest en entorno ${NODE_ENV}`);
        res.json({ mensaje: `Log de nivel ${tipoLog} generado en LoggerTest en entorno ${NODE_ENV}` });
    } else {
        req.logger.info(`Log de nivel info generado en LoggerTest en entorno ${NODE_ENV}`);
        res.json({ mensaje: `Log de nivel info generado en LoggerTest en entorno ${NODE_ENV}` });
    }
}
