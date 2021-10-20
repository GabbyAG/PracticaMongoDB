/*
Directores
ruta: /api/directores
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const { getDirectores, actualizarDirector, eliminarDirector, crearDirector } = require('../controllers/directores.controllers');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getDirectores);


router.post('/', [

        check('nombre', 'El nombre del director es obligatorio').not().isEmpty(),
        check('pelicula', 'El id de la pelicula debe ser valido').isMongoId(),
        check('pais', 'El pais de la pelicula debe ser valido').not().isEmpty(),
        check('usuario', 'El id del usuario debe ser valido').isMongoId(),
        
        validarCampos
    ],
    crearDirector);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del director es obligatorio').not().isEmpty(),
        check('pelicula', 'El id de la pelicula debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarDirector);

router.delete('/:id', validarJWT, eliminarDirector);



module.exports = router; //para exportar