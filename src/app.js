import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { productModel } from './models/product.model.js';
import __dirname from './utils.js';

const app = express();
const PORT = 8080;

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Conectado con éxito a MongoDB"))
    .catch(error => {
        console.error("Error al conectar a MongoDB:");
        console.error(error.message);
    });

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.io = socketServer;
    next();
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

socketServer.on('connection', async (socket) => {
    console.log("Nuevo cliente conectado");

    try {
        const products = await productModel.find().lean();
        socket.emit('updateProducts', products);
    } catch (error) {
        console.error("Error al obtener productos para socket:", error.message);
    }
});