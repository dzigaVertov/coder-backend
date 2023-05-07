import mongoose from 'mongoose';

const schemaUsuario = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true }, // hasheado
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cartsCollection'
    },
    role: {type: String, required: true, default:'user'}

}, { versionKey: false });

export const usuarioModel = mongoose.model('usuarios', schemaUsuario);

