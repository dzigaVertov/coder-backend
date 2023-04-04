import mongoose from 'mongoose';

const schemaProducto = new mongoose.Schema(
    {
        title : String,
        description : String,
        price : Number,
        thumbnail : String,
        code : String,
        stock : Number,
        category : String,
        status : String,
        
    }
);

export default schemaProducto;
