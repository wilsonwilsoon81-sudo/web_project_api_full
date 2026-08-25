const mongoose = require('mongoose');

const urlRegex = /^(http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El campo "name" es obligatorio'],
    minlength: [2, 'El campo "name" debe tener al menos 2 caracteres'],
    maxlength: [30, 'El campo "name" debe tener como máximo 30 caracteres'],
  },
  link: {
    type: String,
    required: [true, 'El campo "link" es obligatorio'],
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'Por favor, introduce una URL válida para la imagen',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'El campo "owner" es obligatorio'],
    ref: 'user',
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
