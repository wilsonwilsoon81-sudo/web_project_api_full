const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateCardBody, validateCardId } = require('../middlewares/validations');

const router = express.Router();

router.get('/', getCards);

router.post('/', validateCardBody, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
