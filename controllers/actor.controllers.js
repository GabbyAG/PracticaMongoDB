const { response } = require('express');
const Actor = require('../models/actor.models');

const getActor = async(req, res = response) => {
    const actor = await actor.find().
    populate('usuario', 'nombre img').
    populate('pelicula', 'nombre img');

    res.json({
        ok: true,
        actor
    });
}
const crearActor = async(req, res = response) => {
    const uid = req.uid;

    const actor = new Actor({
        usuario: uid,
        ...req.body
    });

    try {

        const actorDB = await actor.save();
        res.json({
            ok: true,
            actor:actorDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarActor = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const actor = await actor.findById(id);
        if (!actor) {
            return res.status(404).json({
                ok: true,
                msg: 'El actor no existe'

            });
        }

        const cambiosactor = {
            ...req.body,
            actor: uid
        }

        const actorActualizado = await Actor.findByIdAndUpdate(id, cambiosActor, { new: true });

        return res.json({
            ok: true,
            actor: actorActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarActor = async(req, res = response) => {
    const id = req.params.id;

    try {

        const Actor = await Actor.findById(id);
        if (!actor) {
            return res.status(404).json({
                ok: true,
                msg: 'Actor no existe'

            });
        }

        await Actor.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Actor Eliminado'

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
    getActor,
    crearActor,
    actualizarActor,
    eliminarActor
}