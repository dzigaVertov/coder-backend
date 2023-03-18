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

io.on('connection', async clientSocket => {
    console.log(`Nuevo cliente conectado: socket id: ${clientSocket.id}`) ;
});

app.use('/api/products', apiProductsRouter);
app.use('/api/carts', apiCartsRouter);

const managerProductos = new ProductManager('./src/products.json');
app.get('/', async (req, res) => {
    let productos = await managerProductos.getProducts();
    res.render('home', { pageTitle: 'éxito', productos: productos });
});


