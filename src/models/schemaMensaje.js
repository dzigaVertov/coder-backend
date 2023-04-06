import mongoose from 'mongoose';

const schemaMensaje = new mongoose.Schema(
    {
        email : String,
        mensaje : String,
    }
);

export default schemaMensaje;
