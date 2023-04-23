// Server imports
import express from 'express';
import { engine } from 'express-handlebars';
import { Server as SocketIOServer } from 'socket.io';
import { PORT } from '../config/servidor.config.js';
// Routers
import apiProductsRouter from '../Routers/apiProductsRouter.js';
import apiCartsRouter from '../Routers/apiCartsRouter.js';
import productsRouter from '../Routers/productsRouter.js';
import chatRouter from '../Routers/chatRouter.js';
import cartsRouter from '../Routers/cartsRouter.js';
// Mongo imports
// import ProductManagerFile from '../DAO/ProductManagerFile.js';
import { conectar } from '../database/mongoose.js';
import { ProductManagerMongo } from '../DAO/ProductManagerMongo.js';
import { MensajeManagerMongo } from '../DAO/MensajeManagerMongo.js';
import { CartManagerMongo } from '../DAO/CartManagerMongo.js';


//  MONGO
await conectar();
export const managerProductosMongo = new ProductManagerMongo();
export const mensajeManager = new MensajeManagerMongo();
export const cartManagerMongo = new CartManagerMongo();


// Manager persistencia en archivos
// export const managerProductos = new ProductManagerFile('./src/products.json');


const app = express();

// Handlebars
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

// Archivos estáticos
app.use(express.static('./public'));

// Middleware para acceder al body del POST request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server WebSocket
const httpServer = app.listen(PORT, () => console.log('Escuchando en puerto 8080'));
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

    clientSocket.on('nuevoMensaje', async mensaje => {
        mensajeManager.addMensaje(mensaje);
        let mensajes = await mensajeManager.getMensajes();
        mensajes = mensajes.map(msj => ({ email: msj.email, mensaje: msj.mensaje }));
        io.sockets.emit('actualizacionMensajes', mensajes);
    });


});



app.use('/', productsRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/carts', apiCartsRouter);
app.use('/chat', chatRouter);
app.use('/carts', cartsRouter);


