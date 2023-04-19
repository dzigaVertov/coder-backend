import mongoose from 'mongoose';

const schemaCart = new mongoose.Schema(
    {
        productos: [
            {
                quantity: { type: Number, required: true },
            }
        ]
    },
    { versionKey: false}
);

export default schemaCart;
