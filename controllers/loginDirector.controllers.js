const { response } = require("express");
const bcrypt = require('bcryptjs');
const Director = require ('../models/director.models');
const { generarJWT } =  require('../helpers/jwt')
const loginDirectores = async(req, res= response)=> {
    const {nombre, usuario } = req.body;
    try {        
        // Verificar al usuario por su email
        const directorDB = await Director.findOne({ nombre});
        if ( !directorDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'nombre no encontrado'
                //considerar la utilizacion de este mensaje
            });
        }
        // Verificar contraseña
        //const validPassword = bcrypt.compareSync( password, directorDB.password );
        const directorPDB = await Director.findOne({usuario});
        if ( !directorPDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }
        // Generar el TOKEN - JWT
        const token = await generarJWT( directorDB.id );
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
    loginDirectores
}