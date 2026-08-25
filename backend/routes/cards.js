const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const router = express.Router();

router.get('/', getCards);
router.post('/', createCard);

router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

router.delete('/:cardId', deleteCard);

module.exports = router;
