const mongoose = require('mongoose');
const dbConection = async() => {
    try {
        //Debemos utilizar la cadena de conexion que tenemos en mongocompass        
        await mongoose.connect('mongodb+srv://adminproject:YTfD5nAE74drMnBa@cluster0.xcz4v.mongodb.net/proyectosdb');
        console.log('Conexion exitosa a la BD')
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la BD');
    }
}
module.exports ={
    dbConection
}
//mongodb+srv://adminproject:YTfD5nAE74drMnBa@cluster0.xcz4v.mongodb.net/