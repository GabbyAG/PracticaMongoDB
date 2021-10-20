/*
  Path: /api/loginpeli
*/
const { Router } = require('express');
const {  loginPeli } = require('../controllers/verPeli.controller')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
router.post('/',
  [
    
    check('nombre', 'El password es obligatorio').not().isEmpty(),
    check('pais', 'El password es obligatorio').not().isEmpty(),
    
    validarCampos
  ],
  loginPeli
);
module.exports = router;