import mongoose from 'mongoose';

const schemaCart = new mongoose.Schema(
    {
        productos: [
            {
                codigoProducto: { type: Number, required: true },
                quantity: { type: Number, required: true },
            }
        ]
    },
    { versionKey: False}
);

export default schemaCart;
