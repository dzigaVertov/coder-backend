import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { JWT_KEY } from '../config/auth.config.js';
import { chequearPassword, hashear } from '../utils/criptografia.js';
import { usersRepository } from '../repositories/userRepository.js';

// LOCAL
passport.use('local', new LocalStrategy({ usernameField: 'email' }, checkUsernamePassword));

async function checkUsernamePassword(email, password, done) {
    let usuario = await usersRepository.readOne({ email: email });
    if (!usuario || !chequearPassword(password, usuario.password)) {
        return done(new Error('Error en el login'));
    }
    done(null, usuario);
}

// JWT
const opcionesJwt = {
    secretOrKey: JWT_KEY,
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
};

passport.use('jwt', new JwtStrategy(opcionesJwt, jwtVerificado));




function cookieExtractor(req) {
    let token = null;
    if (req && req.signedCookies) {
        token = req.signedCookies['jwt'];
    }
    return token;
}

async function jwtVerificado(jwt_payload, done) {
    try {
        return done(null, jwt_payload);
    } catch (error) {
        done(error);
    }
}


export function autenticarJwtApi(req, res, next) {
    function passportCB(error, jwt_payload, info) {
        if (error || !jwt_payload) return next(new Error('Error de autenticación'));
        req.user = jwt_payload;
        next();
    }
    const auth_middleware_api = passport.authenticate('jwt', { session: false }, passportCB);
    auth_middleware_api(req, res, next);
}

export function autenticarJwtView(req, res, next) {
    function passportCB(error, jwt_payload, info) {
        if (error || !jwt_payload) {
            return res.redirect('login');
        }

        req.user = jwt_payload;
        next();
    }

    const auth_middleware_view = passport.authenticate('jwt', { session: false }, passportCB);
    auth_middleware_view(req, res, next);
}

export function autenticarLocal(req, res, next) {

    const passMiddleware = passport.authenticate('local', { session: false, failureRedirect: '/login' });

    return passMiddleware(req, res, next);
}

export const passportInitialize = passport.initialize();
