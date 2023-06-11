export async function handleGetProfile(req, res, next) {
    if (req.user) {
        res.render('perfil', { usuario: req.user });
    } else {
        res.redirect('/login');
    }

}
