import { BaseRepository } from './baseRepository.js';
import { cartsDao } from '../DAO/persistenciaFactory.js';
import { Cart } from '../models/cartModel.js';

class CartRepository extends BaseRepository {
    constructor(dao) {
        super(dao);
    }

    create(owner){
        let cart = new Cart(owner);
        super.create(cart);
    }
    
}

export const cartRepository = new CartRepository(cartsDao);

