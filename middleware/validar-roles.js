const { response, request } = require("express")


const esAdminRole = (req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere vefificar el role sin valdiar el token'
        })
    }

    const {rol, nombre}  = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no tiene persmisos para dicha accion`
        })
    }

    next();
}


const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg:'Se quiere vefificar el role sin valdiar el token'
            })
        }

        const {rol, nombre}  = req.usuario;

        if(!roles.includes(rol)){
            return res.status(401).json({
                msg:`${nombre} no tiene persmisos para dicha accion - Tiene Rol`
            })
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}