import {Router} from 'express';

export default apiProductsRouter = Router();



apiProductsRouter.get('/products', async (req, res) => {
    let products = await manager.getProducts();
    const { limit } = req.query;
    if (limit) {
        products = products.slice(0, limit);
    }

    res.json({ products: products });
});

apiProductsRouter.get('/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        let producto = await manager.getProductById(id);
        res.send(producto);
    }
    catch {
        res.json({error:'id de producto no encontrada'});
    }

});
