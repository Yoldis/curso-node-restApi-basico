const{Router} = require('express');
const { check } = require('express-validator');

const { loginController } = require('../controllers/authController');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();


router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatorio').notEmpty(),
    validarCampos
], loginController);



module.exports = router;