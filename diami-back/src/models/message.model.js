// Importaciones
const mongoose = require('mongoose');

// Instancia de Schema mongo
const Schema = mongoose.Schema;

// Creación de Schema para el modelo usuario
const MessageSchema = new Schema({
  idUser: {
    type: String
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
  img: {
    type: String
  },
  tokenFirebase: {
    type: String
  },
  situation: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

// Exportación del Schema para usar en otras clases
module.exports = mongoose.model('Message', MessageSchema, 'Message');
