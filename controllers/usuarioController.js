const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarioModel');

  // Las query son las variables que se define en la url despues del signo de ?
    // Ejemplo: localhost:8082/api/usuarios?q=Hola
    // En este caso existe una varible q que llega en la query que tiene como valor Hola
    // const {q, lala} = req.query;

    // npm i bcryptjs, para encripatado de contrasenas

     // Los parametros es el valor que se le pasa en la url
    // Ejemplo: localhost:8082/api/usuarios/10
    //El parametro es el 10, que depende como lo definiste en la ruta

    //npm i express-validator, para valdiar campos



const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};

    // const usuarios = await Usuario.find(query)
    // .skip(desde).limit(limite);
    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(desde).limit(limite)
    ])

    res.status(200).json({
        msg:'Peticion get - Controlador',
        total, 
        usuarios
    })
}


const usuariosPost = async(req, res = response) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
    // Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    
    // Guardar en DB
    await usuario.save();
    
    res.status(201).json({
        msg:'Peticion post - Controlador',
        usuario:usuario
    })
}

const usuariosPut = async (req, res = response) => {
    const {id} = req.params;
    const {_id, password, google, ...resto} = req.body;
    
    if(password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true});
    
    res.status(201).json({
        msg:'Peticion put - Controlador',
        id,
        usuario
    })
}

const usuariosDelete = async(req, res = response) => {
    
    const{id} = req.params;
    
    // Eliminar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}, {new:true});
    
    // Mi variable de prueba creada en el objeto req
    const dev = req.dev;

    res.status(200).json({
        msg:'Peticion delete - Controlador',
        id,
        usuario,
        dev
    })
}





//  Controlador de Pruebas
const usuariosPatch = async(req, res = response) => {

    const params = req.params;
    const query = req.query;
    const ususario= await Usuario.find({nombre:'test1'}, 'nombre correo');


    res.status(200).json({
        msg:'Peticion patch - Controlador',
        ususario,
        params,
        query
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}