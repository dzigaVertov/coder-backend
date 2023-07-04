import { Router } from 'express';
import passport from 'passport';
import { handleGetProfile } from '../controllers/userWebController.js';
// import { autenticarJwtView } from '../middlewares/passport.js';


const userRouter = Router();
export default userRouter;

userRouter.get('/', (req, res) => {
    res.redirect('/login');
});

userRouter.get('/login', (req, res) => {
    res.render('login');
});

userRouter.get('/register', (req, res) => {
    res.render('registro');
});

userRouter.get('/resetpassword', )

userRouter.get('/profile', passport.authenticate('jwt', { session: false }), handleGetProfile);
