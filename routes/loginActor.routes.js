/*
  Path: /api/loginActor
*/
const { Router } = require('express');
const {  loginActor } = require('../controllers/loginActor.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
router.post('/',
  [
    
    check('nombre', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    validarCampos
  ],
  loginActor
);
module.exports = router;