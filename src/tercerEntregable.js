import express from 'express';
import ProductManager from './segundoEntregable.js';

const app = express();
const manager = new ProductManager('./src/archivoProductos.txt');

app.get('/products', async (req, res) => {
    let products = await manager.getProducts();
    const {limit} = req.query;
    let sl = products.slice(limit);
    res.json({
        products:sl,
        ruta: 'usuarios',
        urlParams: req.params,
        queryParams: req.query
    });
});


app.get('/cosas', (req, res) => {
    res.sendFile('cosas.html', { root: './views' });
});

const server = app.listen(8080, ()=>console.log('listening on port 8080'));
