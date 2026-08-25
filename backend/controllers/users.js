// bcryptjs is required at runtime for password hashing and comparison.
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// jsonwebtoken is required at runtime for signing authentication tokens.
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(409).send({ message: 'Este email ya está registrado' });
      }
      return bcrypt.hash(password, 10).then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }));
    })
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos inválidos' });
      }
      if (err.code === 11000) {
        return res.status(409).send({ message: 'Este email ya está registrado' });
      }
      return res.status(500).send({ message: 'Error interno del servidor' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Credenciales incorrectas' });
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res.status(401).send({ message: 'Credenciales incorrectas' });
        }
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET || 'super-secret-key-practicum',
          { expiresIn: '7d' },
        );
        return res.send({ token });
      });
    })
    .catch(() => {
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Error interno del servidor' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de usuario inválido' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Error interno del servidor' });
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos inválidos' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Error interno del servidor' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos inválidos' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Error interno del servidor' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
