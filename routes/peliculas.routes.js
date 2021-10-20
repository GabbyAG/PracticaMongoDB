/*
    Peliculas
    ruta: /api/peliculas
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const { getPeliculas, actualizarPeliculas, eliminarPeliculas, crearPeliculas } = require('../controllers/peliculas.controllers');


const router = Router();

router.get('/', getPeliculas);


router.post('/', [
        
        check('nombre', 'El nombre de la pelicula es obligatorio').not().isEmpty(),
        check('genero', 'El genero de la pelicula es obligatorio').not().isEmpty(),
        check('pais', 'El País de la pelicula es obligatorio').not().isEmpty(),
        check('sinopsis', 'La sinopsis de la pelicula es obligatorio').not().isEmpty(),
        check('usuario', 'El id de usuario debe ser valido').isMongoId(),
        check('actor', 'El id de actor de la pelicula es obligatorio').isMongoId(),
      
      
      
        validarCampos
    ],
    crearPeliculas);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de la pelicula es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPeliculas);

router.delete('/:id',
    validarJWT,
    eliminarPeliculas);



module.exports = router; //para exportar