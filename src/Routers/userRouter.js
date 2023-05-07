import { Router } from 'express';

const userRouter = Router();
export default userRouter;
import { autenticarJwtView } from '../middlewares/passport.js'

userRouter.get('/', (req, res) => {
    res.redirect('/login');
});

userRouter.get('/login', (req, res) => {
    res.render('login');
})

userRouter.get('/register', (req, res) => {
    res.render('registro');
});

userRouter.get('/profile', autenticarJwtView, (req, res) => {
    if (req.session.user) {
        res.render('perfil', { usuario: req.session['user'] });
    } else {
        res.redirect('/login');
    }

})


