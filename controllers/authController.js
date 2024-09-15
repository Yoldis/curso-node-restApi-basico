const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarioModel');
const generarToken = require('../helpers/generarToken');


const loginController = async(req = request, res = response) => {
    
    const {correo, password} = req.body;

    // Verificar si el email existe
    const usuario = await Usuario.findOne({correo});
    if(!usuario) {
        return res.status(400).json({
            msg:'Usuario / Password no son correctos - correo'
        })
    }

    // Verificar si el usuario est activo
    if(!usuario.estado) {
        return res.status(400).json({
            msg:'Usuario / Password no son correctos - estado : false'
        })
    }

    // Verificar contrasena
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if(!validPassword){
        return res.status(400).json({
            msg:'Usuario / Password no son correctos - password'
        })
    }

    // Generar JWT
    const token = await generarToken(usuario.id);

    res.status(200).json({
        msg:'Login-Controller',
        usuario,
        token
    })
}



module.exports = {
    loginController
}