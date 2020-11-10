const express = require('express');
const { dbconection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');


//usuario: userguadana
//password: 7a8QCVMOiRXbQFBT
// mongodb+srv://userguadana:7a8QCVMOiRXbQFBT@cluster0.klynh.mongodb.net/GuadañaDB

//Código desplagar servidor
const server = express();

//configurando cors
server.use(cors());
/*
server.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Desplegando el primer servicio REST'
    });
});*/

//Lectura y parseo del body
server.use(express.json());

//Conexion a la base de datos
dbconection();

//Para ver las variables de entorno
//console.log(process.env)

//rutas del API
server.use('/api/usuarios', require('./routes/usuariosRoute'));
server.use('/api/peliculas', require('./routes/peliculasRoute'));
server.use('/api/directores', require('./routes/directoresRoute'));


server.listen(process.env.PORT, () => {
    console.log('El servidor está ejecutándose en el puerto: ' + process.env.PORT);
    //console.log('Yeison Guadaña Perez')
});