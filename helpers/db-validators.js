
const Role = require('../models/roleModel');
const Usuario = require('../models/usuarioModel');

// Verificar el rol si existe en la coleccion roles
const validarRol = async(rol = '') => {
    const existeElRol  = await Role.findOne({rol});
    if(!existeElRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

// Verificar si el correo existe en la coleccion de Usuarios
const emailExiste =  async(correo = '') => {
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        throw new Error(`El correo: ${correo}, ya esta registrado`);
    }
}

const existeId = async(id = '') => {
    if(id.length !== 24) {
        throw new Error(`El id ${id} no es valido`);
    }

    const existeId = await Usuario.findById({_id:id});
    if(!existeId){
        throw new Error(`El id ${id} no es valido`);
    }
}


module.exports = {
    validarRol,
    emailExiste,
    existeId
}