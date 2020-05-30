// Importaciones
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const Server = require('./server/server');
const MongoConnection = require('./server/db');

// Uso de variables de entorno en local (REMOVER PARA PASO A PRODUCCIÓN)
require('dotenv').config();

// Instancia del servidor
const server = new Server();

// Creación de servidor http para sockets
let serverIO = http.createServer(server.app);

// Instancia de la conexión a mongo
const mongo = new MongoConnection();
// Inicialización de la conexión a mongo
mongo.start();

// Middlewares para manejo de peticiones JSON
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de CORS
server.app.use(cors({ origin: true, credentials: true }));

// Configuración global de rutas
server.app.use(require('./routes/index'));

// Inicialización de sockets
module.exports.io = socketIO(serverIO);
require('./sockets/socket');

// Inicialización del servidor para sockets
serverIO.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        throw err;
    }
    console.log('Servidor y Sockets ejecutandose', process.env.PORT);
});
