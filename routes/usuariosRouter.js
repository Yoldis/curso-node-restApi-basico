const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarioController');

const { validarRol, emailExiste, existeId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, tieneRole } = require('../middleware');

// Los parametros es el valor que se le pasa en la url
// Ejemplo /:id en este caso se definio un parametro llamado id que recibira cualquier valor

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    check('nombre', 'El nombre no puede ser un numero').isString(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom((correo) => emailExiste(correo)),
    check('rol').custom( (rol) => validarRol(rol) ),
    check('password', 'El password debe tener minimo 6 letras').isLength({min:6}),

    // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
] ,  usuariosPost);


router.put('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom((id) => existeId(id)),
    check('rol').custom( (rol) => validarRol(rol) ),
    validarCampos
], usuariosPut);



router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom((id) => existeId(id)),
    validarCampos,
], usuariosDelete);



router.get('/otro', usuariosPatch);


module.exports = router;