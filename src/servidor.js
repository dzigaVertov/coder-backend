import express from 'express';
import ProductManager from './ProductManager.js';
import apiProductsRouter from './Routers/apiProductsRouter.js';
const app = express();

const manager = new ProductManager('./src/archivoProductos.txt');


const apiCartsRouter  = Router();

app.use(apiProductsRouter);
app.use(apiCartsRouter);

const server = app.listen(8080, () => console.log('listening on port 8080'));
