// Importaciones
const express = require('express');

// Inicialización express
const app = express();

app.use(require('./user.route'));
app.use(require('./external-services'));

module.exports = app;