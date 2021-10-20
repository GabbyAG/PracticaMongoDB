/*
Actores
ruta: /api/actores
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const { getActor, actualizarActor, eliminarActor, crearActor } = require('../controllers/actor.controllers');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getActor);


router.post('/', [
    
        check('nombre', 'El nombre del Actor es obligatorio').not().isEmpty(),
        check('email', 'El email de debe ser valido').not().isEmpty(),
        check('telefono', 'El telefono de debe ser valido').not().isEmpty(),
        validarCampos
    ],
    crearActor);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Actor es obligatorio').not().isEmpty(),
        check('pelicula', 'El id de la pelicula debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarActor);

router.delete('/:id', validarJWT, eliminarActor);



module.exports = router; //para exporta