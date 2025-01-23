// Importamos las dependencias necesarias
// const express = require('express'); // Framework para gestionar el servidor HTTP
// const cors = require('cors'); // Middleware para habilitar CORS
// const mongoose = require('mongoose'); // Para conectarnos a la base de datos MongoDB
// require('dotenv').config(); // Para cargar las variables de entorno desde el archivo .env

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Para cargar las variables de entorno desde el archivo .env
import itemRoutes from './routes/itemesroute.js';
import path from 'path';

dotenv.config();


// Inicializamos la aplicación Express
const app = express();
app.use(cors()); // Habilitar CORS para permitir peticiones de otros orígenes
app.use(express.json()); // Parsear JSON en las solicitudes entrantes

const PORT = process.env.PORT || 5000; // Puerto donde correrá el servidor
const DB_URI = 'mongodb+srv://devrier1583:Registel&120@cluster0.mvzbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // URL de conexión a la base de datos (definida en .env)'
//console.log(DB_URI)
// Conectamos a la base de datos de MongoDB
mongoose.connect(DB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log('Error al conectar a la base de datos: ', err));

// Importamos las rutas del CRUD para los items
//const itemRoutes = require('./routes/itemesroute');

// Servir archivos estáticos y el index.html
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta con los archivos estáticos

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/items', itemRoutes); // Definimos las rutas para gestionar los items

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
