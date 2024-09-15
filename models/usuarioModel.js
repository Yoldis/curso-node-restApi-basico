const{Schema, model} = require('mongoose');


const UsuarioSchema = Schema({

    nombre:{
        type:String,
        required:[true, 'El nombre es requerido']
    },

    correo:{
        type:String,
        required:[true, 'El correo es requerido'],
        unique:true
    },

    password:{
        type:String,
        required:[true, 'El password es requerido']
    },

    img:{
        type:String,
    },

    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE', 'USER_ROLE']
    },

    estado:{
        type:Boolean,
        default:true
    },

    google:{
        type:Boolean,
        default:false
    }
})



// Eliminar del objeto usuarios las propiedades __v y password

// Nota, esto es una funcion personalizada agregado al objeto UsuarioSchema.methods, la cual le dimos el nombre toJSON, que puede ser cualquier otro nombre y ya a partir de esto puedes hacer logica con los objetos propio del UsuarioSchema
UsuarioSchema.methods.toJSON = function(){
    const{__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);