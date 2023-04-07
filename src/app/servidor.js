import express from 'express';
import { engine } from 'express-handlebars';
import { Server as SocketIOServer } from 'socket.io';
import apiProductsRouter from '../Routers/apiProductsRouter.js';
import apiCartsRouter from '../Routers/apiCartsRouter.js';
import ProductManagerFile from '../DAO/ProductManagerFile.js';
import { conectar } from '../database/mongoose.js';
import { ProductManagerMongo } from '../DAO/ProductManagerMongo.js';
import mongoose from 'mongoose';
import schemaProductos from '../models/schemaProducto.js';
import schemaCart from '../models/schemaCart.js';
import { MensajeManagerMongo } from '../DAO/MensajeManagerMongo.js';

//  MONGO
await conectar();
const prods = mongoose.model('products', schemaProductos);
const mensajeManager = new MensajeManagerMongo();


// Manager persistencia en archivos
export const managerProductos = new ProductManagerFile('./src/products.json');


const app = express();

// Handlebars
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

// Archivos estáticos
app.use(express.static('./public'));

// server WebSocket
const httpServer = app.listen(8080, () => console.log('Escuchando en puerto 8080'));
const io = new SocketIOServer(httpServer);

// Agregar referencia al SocketServer en la petición http
app.use((req, res, next) => {
    req['io'] = io;
    next();
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
        });
    });

    clientSocket.on('nuevoMensaje', async mensaje => {
        mensajeManager.addMensaje(mensaje);
        let mensajes = await mensajeManager.getMensajes();
        io.sockets.emit('actualizacionMensajes', mensajes);
    });


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

app.get('/chat', async (req, res) => {
    let mensajes = await mensajeManager.getMensajes();
    let msjs = mensajes.map(msj => ({ email: msj.email, mensaje: msj.mensaje }));
    res.render('chat', { pageTitle: 'Chat', mensajes: msjs, hayMensajes: mensajes.length > 0 });
});



