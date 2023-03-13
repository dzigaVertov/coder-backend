import express, {Router} from 'express';
import ProductManager from '../ProductManager.js';

let  apiProductsRouter = Router();
export default apiProductsRouter;

apiProductsRouter.use(express.json());
apiProductsRouter.use(express.urlencoded({ extended: true}));

const manager = new ProductManager('./src/archivoProductos.txt');


apiProductsRouter.get('/', async (req, res) => {
    let products = await manager.getProducts();
    const { limit } = req.query;
    if (limit) {
        products = products.slice(0, limit);
    }

    res.json({ products: products });
});

apiProductsRouter.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        let producto = await manager.getProductById(id);
        res.send(producto);
    }
    catch {
        res.json({error:'id de producto no encontrada'});
    }

});
