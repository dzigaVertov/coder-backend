import { Router } from 'express';
import passport from 'passport';
const userRouter = Router();
export default userRouter;
import { autenticarJwtView } from '../middlewares/passport.js';

userRouter.get('/', (req, res) => {
    res.redirect('/login');
});

userRouter.get('/login', (req, res) => {
    res.render('login');
});

userRouter.get('/register', (req, res) => {
    res.render('registro');
});

userRouter.get('/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
    if (req.user) {
        res.render('perfil', { usuario: req.user });
    } else {
        res.redirect('/login');
    }

});



