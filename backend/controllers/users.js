const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const err = new Error('Este email ya está registrado');
        err.statusCode = 409;
        throw err;
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
        err.statusCode = 400;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new Error('Credenciales incorrectas');
        err.statusCode = 401;
        throw err;
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new Error('Credenciales incorrectas');
          err.statusCode = 401;
          throw err;
        }
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET || 'super-secret-key-practicum',
          { expiresIn: '7d' },
        );
        res.send({ token });
      });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        next(err);
      } else {
        next(err);
      }
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

const updateUserProfile = (req, res, next) => {
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
        err.statusCode = 400;
      }
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
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
        err.statusCode = 400;
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
