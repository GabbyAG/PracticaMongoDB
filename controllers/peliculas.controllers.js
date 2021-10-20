const { response } = require('express');
const Peliculas= require('../models/pelicula.models');

const getPeliculas = async(req, res = response) => {
    const pelicula = await Peliculas.find()
    .populate('usuario', 'nombre genero')
   .populate('actor', 'nombre genero');

    res.json({
        ok: true,
        pelicula
    });
}
const crearPeliculas = async(req, res = response) => {
    const uid = req.uid;

    const pelicula = new Peliculas({
        usuario: uid,
        ...req.body
    });

    try {

        const peliculaDB = await pelicula.save();
        res.json({
            ok: true,
            pelicula: peliculaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarPeliculas = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const pelicula= await Peliculas.findById(id);
        if (!peliculas) {
            return res.status(404).json({
                ok: true,
                msg: 'Película no existe'

            });
        }

        const cambiosPelicula = {
            ...req.body,
            usuario: uid
        }

        const peliculaActualizado = await peliculas.findByIdAndUpdate(id, cambiosPelicula, { new: true });

        return res.json({
            ok: true,
            peliculas: peliculaActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarPeliculas = async(req, res = response) => {
    const id = req.params.id;

    try {

        const peliculas = await Peliculas.findById(id);
        if (!peliculas) {
            return res.status(404).json({
                ok: true,
                msg: 'Película no existe'

            });
        }

        await Peliculas.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Película Eliminada'

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
    getPeliculas,
    crearPeliculas,
    actualizarPeliculas,
    eliminarPeliculas
}