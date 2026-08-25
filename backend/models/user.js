const mongoose = require('mongoose');
const validator = require('validator');

const urlRegex = /^(http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: [2, 'El campo "name" debe tener al menos 2 caracteres'],
    maxlength: [30, 'El campo "name" debe tener como máximo 30 caracteres'],
  },
  about: {
    type: String,
    default: 'Explorador',
    minlength: [2, 'El campo "about" debe tener al menos 2 caracteres'],
    maxlength: [200, 'El campo "about" debe tener como máximo 200 caracteres'], // <-- Ajustado a 200
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'Por favor, introduce una URL válida para el avatar',
    },
  },
  email: {
    type: String,
    required: [true, 'El campo "email" es obligatorio'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Por favor, introduce un email válido',
    },
  },
  password: {
    type: String,
    required: [true, 'El campo "password" es obligatorio'],
    minlength: [8, 'El campo "password" debe tener al menos 8 caracteres'],
  },
});

module.exports = mongoose.model('user', userSchema);
