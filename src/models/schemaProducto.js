import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const campoRequerido = [true, "El campo es requerido"];

const schemaProducto = new mongoose.Schema(
    {
        title: {
            type: String,
            required: campoRequerido
        },
        description: {
            type: String,
            required: campoRequerido
        },
        price: {
            type: Number,
            required: campoRequerido
        },
        thumbnail: String,
        code: {
            type: String,
            unique: true,
            dropDups: true,
            required: {
                type: String,
                required: campoRequerido
            }
        },
        stock: {
            type: Number,
            required: campoRequerido
        },
        category: {
            type: String,
            required: campoRequerido
        },
        status: {
            type: String,
            required: campoRequerido
        },
    },
    { versionKey: false }
);

export default schemaProducto;
