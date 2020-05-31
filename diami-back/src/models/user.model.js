// Importaciones
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Enum para roles
const validRoles = {
  values: ['USER', 'PROFESSIONAL'],
  message: '{VALUE} no es un rol válido'
};

// Instancia de Schema mongo
const Schema = mongoose.Schema;

// Creación de Schema para el modelo usuario
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo electrónico es requerido']
  },
  password: {
    type: String,
    min: [6, 'La contraseña debe tener mínimo 6 carácteres'],
    minlength: [6, 'La contraseña debe tener mínimo 6 carácteres'],
    required: [true, 'La contraseña es requerida']
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
  role: {
    type: String,
    default: 'USER',
    enum: validRoles
  },
  state: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});


// Función de validador para campos únicos
UserSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

// Exportación del Schema para usar en otras clases
module.exports = mongoose.model('User', UserSchema, 'User');
