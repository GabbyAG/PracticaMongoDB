const { response } = require("express");
const bcrypt = require('bcryptjs');
const Pelicula = require ('../models/pelicula.models');
const { generarJWT } =  require('../helpers/jwt')
const loginPeli = async(req, res= response)=> {
    const {nombre, pais } = req.body;
    try {        
        // Verificar al usuario por su email
        const peliDB = await Pelicula.findOne({ nombre});
        if ( !peliDB) {
            return res.status(404).json({
                ok: false,
                msg: 'peli no encontrado'
                //considerar la utilizacion de este mensaje
            });
        }
        // Verificar contraseña
        //const validPassword = bcrypt.compareSync( password, directorDB.password );
        const peliPDB = await Pelicula.findOne({pais});
        if ( !peliPDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }
        // Generar el TOKEN - JWT
        const token = await generarJWT( peliDB.id );
        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuníquese con el administrador'
        })
    }
}
module.exports = {
    loginPeli
}