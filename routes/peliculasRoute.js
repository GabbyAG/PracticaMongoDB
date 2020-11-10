/*
    Peliculas
    ruta: /api/peliculas
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const { getPeliculas, actualizarPelicula, eliminarPelicula, crearPelicula } = require('../controllers/peliculasController');


const router = Router();

router.get('/', getPeliculas);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la pelicula es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearPelicula);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de la pelicula es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPelicula);

router.delete('/:id',
    validarJWT,
    eliminarPelicula);



module.exports = router; //para exportar