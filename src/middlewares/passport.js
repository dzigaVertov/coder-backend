import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { JWT_SECRET_KEY } from '../config/auth.config.js';
import { usuarioModel } from '../models/schemaUsuario.js';
import { chequearPassword } from '../utils/criptografia.js';

// LOCAL
passport.use('local', new LocalStrategy({ usernameField: 'email' }, checkUsernamePassword));

async function checkUsernamePassword(email, password, done) {
    const usuarioEncontrado = await usuarioModel.findOne({ email: email }).lean();
    if (!usuarioEncontrado || !chequearPassword(password, usuarioEncontrado.password)) {
        console.log('usuario mal');
        return done(new Error('Error en el login'));
    }

    done(null, usuarioEncontrado);
}

// JWT
const opcionesJwt = {
    secretOrKey: JWT_SECRET_KEY,
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

function jwtVerificado(jwt_payload, done) {
    try {
        return done(null, jwt_payload.user);
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

    const auth_middleware_api = passport.authenticate('jwt', { session: false },  passportCB);
    auth_middleware_api(req, res, next);
}

export function autenticarJwtView(req, res, next) {
    function passportCB(error, jwt_payload, info) {
        if (error || !jwt_payload) return res.redirect('login');
        req.user = jwt_payload;
        next();
    }

    const auth_middleware_view = passport.authenticate('jwt', { session: false },  passportCB);
    auth_middleware_view(req, res, next);
}

export function autenticarLocal(req, res, next) {

    const passMiddleware = passport.authenticate('local',  { session: false, failureRedirect: '/login'} );

    return passMiddleware(req, res, next);
}

export const passportInitialize = passport.initialize();
