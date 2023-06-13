import { cartRepository } from '../repositories/cartRepository.js';

export async function getCidHandler(req, res, next) {
    try {
        // TODO: Quizás poner en un servicio?
        const cid = req.params.cid;
        const cart = await cartRepository.readOne({ _id: cid });
        console.log(cart);
        const productos = cart.productos;
        const hayDocs = productos.length > 0;
        res.render('cart', { productos, hayDocs });

    } catch (error) {
        next(error)
    }
}
