export function soloRol(role) {
    function middlewareSoloRol(req, res, next) {
        if (req.user?.role === role) return next();
        return next(new Error(`No autorizado para rol:${role}`));
    }

    return middlewareSoloRol;
}

export function soloCartDeUsuarioOadmin() {
    function middlewareCartUsuario(req, res, next) {
        const cid = req.params.cid;
        if (req.user?.role === 'admin') return next();
        if (req.user?.cart === cid) return next();

        return next(new Error('Error de autorización'));
    }
    return middlewareCartUsuario;
}
