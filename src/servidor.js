import express from 'express';
import { engine } from 'express-handlebars';
import { Server as SocketIOServer } from 'socket.io';
import apiProductsRouter from './Routers/apiProductsRouter.js';
import apiCartsRouter from './Routers/apiCartsRouter.js';
import ProductManager from './ProductManager.js';


const app = express();
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.static('./public'));

const httpServer = app.listen(8080, () => console.log('listening on port 8080'));
const io = new SocketIOServer(httpServer);
export const managerProductos = new ProductManager('./src/products.json', async function () {
    let productos = await managerProductos.getProducts();
    io.sockets.emit('actualizacion', productos);
});


io.on('connection', async clientSocket => {
    console.log(`Nuevo cliente conectado: socket id: ${clientSocket.id}`);

    clientSocket.on('mensaje', mensaje => {
        console.log(mensaje);
    });

    clientSocket.on('nuevoProducto', campos => {
        console.log('nuevoproductorecibido', campos);
        managerProductos.addProduct({
            "title": campos.title,
            "description": campos.description,
            "code": campos.code,
            "price": 179,
            "status": true,
            "stock": 200,
            "category": "categoria",
            "thumbnails": ["thumb-1", "thumb-2"]
        })
    })


});



app.use('/api/products', apiProductsRouter);
app.use('/api/carts', apiCartsRouter);



app.get('/', async (req, res) => {
    let productos = await managerProductos.getProducts();
    res.render('home', { pageTitle: 'éxito', productos: productos });
});

app.get('/realTimeProducts', async (req, res) => {
    let productos = await managerProductos.getProducts();
    res.render('realTimeProducts', { pageTitle: 'realtime', productos: productos });
});



