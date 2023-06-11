import { BaseRepository } from './baseRepository.js';
import { cartsDao } from '../DAO/persistenciaFactory.js';
import { Cart } from '../models/cartModel.js';

class CartRepository extends BaseRepository {
    constructor(dao, cartModel) {
        super(dao, cartModel);
    }

    create(owner){
        return super.create(owner);
    }
    
}

export const cartRepository = new CartRepository(cartsDao, Cart);

