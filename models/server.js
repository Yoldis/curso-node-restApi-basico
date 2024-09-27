const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.urlUsuarios = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();
        
        // Midlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // Usamos la configuracion de cors, para que el frontend tenga persmisos a hacer solicitudes al backend
        this.app.use(cors());
        // Lectura y parseo del body - Es obligatorio,
        // es para aceptar peticiones en formato JSON a mi backend
        this.app.use(express.json());
        // Para mostrar contenido estatico desde el backend, lo agregamos en la carpeta public
        this.app.use(express.static('public'));
    }

    routes(){
        // Aqui agregamos todas nuestra rutas
        this.app.use(this.urlUsuarios, require('../routes/usuariosRouter'));
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor levantado en el puerto', this.port);
        })
    }
}


module.exports = Server;