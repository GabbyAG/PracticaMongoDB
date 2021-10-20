const { response } = require('express');
const Director = require('../models/director.models');

const getDirectores = async(req, res = response) => {
    const directores = await Director.find().
    populate('usuario', 'nombre img').
    populate('pelicula', 'nombre img');

    res.json({
        ok: true,
        directores
    });
}
const crearDirector = async(req, res = response) => {
    const uid = req.uid;

    const director = new Director({
        usuario: uid,
        ...req.body
    });

    try {

        const directorDB = await director.save();
        res.json({
            ok: true,
            director: directorDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarDirector = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const director = await Director.findById(id);
        if (!director) {
            return res.status(404).json({
                ok: true,
                msg: 'Director no existe'

            });
        }

        const cambiosDirector = {
            ...req.body,
            usuario: uid
        }

        const directorActualizado = await Director.findByIdAndUpdate(id, cambiosDirector, { new: true });

        return res.json({
            ok: true,
            director: directorActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarDirector = async(req, res = response) => {
    const id = req.params.id;

    try {

        const director = await Director.findById(id);
        if (!director) {
            return res.status(404).json({
                ok: true,
                msg: 'Director no existe'

            });
        }

        await Director.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Director Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}


module.exports = {
    getDirectores,
    crearDirector,
    actualizarDirector,
    eliminarDirector
}