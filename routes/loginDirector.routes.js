/*
  Path: /api/loginDirector
*/
const { Router } = require('express');
const { loginDirectores } = require('../controllers/loginDirector.controllers')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
router.post('/',
  [
    check('nombre', 'El email es obligatorio').not().isEmail(),
    check('usuario', 'El password es obligatorio').isMongoId(),
    validarCampos
  ],
  loginDirectores
);
module.exports = router;