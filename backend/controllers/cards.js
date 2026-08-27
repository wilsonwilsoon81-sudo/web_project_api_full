const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const err = new Error('Tarjeta no encontrada');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        const err = new Error('No tienes permiso para eliminar esta tarjeta');
        err.statusCode = 403;
        throw err;
      }
      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then((deletedCard) => res.status(200).send({
      message: 'Tarjeta eliminada',
      card: deletedCard,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Tarjeta no encontrada');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Tarjeta no encontrada');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
