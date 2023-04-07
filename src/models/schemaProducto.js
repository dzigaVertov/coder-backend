import mongoose from 'mongoose';

const schemaProducto = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        thumbnail: String,
        code: {
            type: String,
            unique: true,
            dropDups: true
            },
        stock: Number,
        category: String,
        status: String,
    }
);

export default schemaProducto;
