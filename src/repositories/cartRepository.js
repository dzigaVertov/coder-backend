import { BaseRepository } from './baseRepository.js';
import { cartsDao } from '../DAO/persistenciaFactory.js';
import { Cart } from '../models/cartModel.js';

class CartRepository extends BaseRepository {
    constructor(dao, cartModel) {
        super(dao, cartModel);
    }

    
    async getCarts(){
        super.dao.getCarts();
    }       
}

export const cartRepository = new CartRepository(cartsDao, Cart);

