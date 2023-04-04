import mongoose from 'mongoose';
import { MONGODB_STRING_CONEXION } from '../config/database.config';

export async function conectar() {
    await mongoose.connect(MONGODB_STRING_CONEXION);
    console.log(`Base de datos conectada a ${MONGODB_STRING_CONEXION}`);
}
