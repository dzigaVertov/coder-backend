import express from 'express';

import apiProductsRouter from './Routers/apiProductsRouter.js';
import apiCartsRouter from './Routers/apiCartsRouter.js';
const app = express();

app.use('/api/products', apiProductsRouter);
app.use('/api/carts', apiCartsRouter);

const server = app.listen(8080, () => console.log('listening on port 8080'));
