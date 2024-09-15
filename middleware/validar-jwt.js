const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');


const validarJWT = async(req = request, res = response, next) => {

    // const token = req.header('x-token');
    const {'x-token':token} = req.headers;
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try { 
        const {uid} = jwt.verify(token, process.env.SECRETKEY);
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg:'Token no valido - Usuario no existe en la DB'
            })
        }

        // Verificar si el uid tiene el estado en true
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no valido - Usuario con estado false'
            })
        }

        // La req es un objeto, dentro de este objeto creo la variable req.uid y le asigno el valor uid que tiene el token
        // Si existiera la req.uid entonces el valor se modificaria, como no existe esta variable entonces se crea
        req.usuario = usuario;

        // Mi variable de prueba creada en el objeto req
        req.dev = 'YoldisDev';
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
};