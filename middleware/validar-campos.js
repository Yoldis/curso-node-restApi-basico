const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    // next para pasar a la siguiente funcion en la ruta
    next();
}

module.exports = {
    validarCampos
}
