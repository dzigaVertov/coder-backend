import mongoose from 'mongoose';

const schemaProducto = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "El campo es requerido"]
        },
        description: {
            type: String,
            required: [true, "El campo es requerido"]
        },
        price: {
            type: Number,
            required: [true, "El campo es requerido"]
        },
        thumbnail: String,
        code: {
            type: String,
            unique: true,
            dropDups: true,
            required: {
                type: String,
                required: [true, "El campo es requerido"]
            }
        },
        stock: {
            type: Number,
            required: [true, "El campo es requerido"]
        },
        category: {
            type: String,
            required: [true, "El campo es requerido"]
        },
        status: {
            type: String,
            required: [true, "El campo es requerido"]
        },
    }
);

export default schemaProducto;
