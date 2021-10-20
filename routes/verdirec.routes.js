/*
  Path: /api/logindirector
*/
const { Router } = require('express');
const {  loginDirectores } = require('../controllers/loginDirector.controllers')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
router.post('/',
  [
    
    check('nombre', 'El password es obligatorio').not().isEmpty(),
    check('usuario', 'El password es obligatorio').isMongoId(),
    validarCampos
  ],
  loginDirectores
);
module.exports = router;