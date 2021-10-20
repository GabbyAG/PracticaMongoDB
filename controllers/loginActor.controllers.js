const { response } = require("express");
const bcrypt = require('bcryptjs');
const Actor = require ('../models/actor.models');
const { generarJWT } =  require('../helpers/jwt')
const loginActor = async(req, res= response)=> {
    const {nombre, email } = req.body;
    try {        
        // Verificar al usuario por su nombre
        const actorDB = await Actor.findOne({ nombre});
        if ( !actorDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'nombre no encontrado'
            });
        }
        // Verificar el email
        const actorPDB = await Actor.findOne({email});
        if ( !actorPDB) {
            return res.status(400).json({
                ok: false,
                msg: 'email incorrecto'
            });
        }
        // Generar el TOKEN - JWT
        const token = await generarJWT( actorDB.id );
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
    loginActor
}