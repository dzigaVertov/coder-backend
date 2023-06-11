import { cartRepository } from '../repositories/cartRepository.js';

export async function getHandler(req, res, next){
    try {
        const carts = await cartRepository.getCarts();
        res.json(carts);
    } catch(error) {
        next(error);        
    }
}

export async function postHandler(req, res, next){
    const {owner} = req.body;
    try {
        const nuevoCart = await cartRepository.create(owner);
        res.json(nuevoCart);
    } catch(error) {
        next(error);        
    }
}
