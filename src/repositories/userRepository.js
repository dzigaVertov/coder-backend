import { usersDao } from '../DAO/persistenciaFactory.js';
import { BaseRepository } from './baseRepository.js';

export const usersRepository = new BaseRepository(usersDao);
