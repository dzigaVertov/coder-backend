import express from 'express';
import ProductManager from './segundoEntregable.js';

const app = express();
const manager = new ProductManager('./src/archivoProductos.txt');

app.get('/products', async (req, res) => {
    let products = await manager.getProducts();
    const { limit } = req.query;
    if (limit) {
        products = products.slice(0, limit);
    }

    res.json({
        products: products,
        ruta: 'usuarios',
        urlParams: req.params,
        queryParams: req.query
    });
});

app.get('/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);

    try { let producto = await manager.getProductById(id);
          res.send(producto);}
    catch {
        res.send('id de producto no encontrada');        
          }

});
const server = app.listen(8080, () => console.log('listening on port 8080'));
