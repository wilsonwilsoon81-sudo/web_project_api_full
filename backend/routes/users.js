const express = require('express');
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);

router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

router.get('/:userId', getUserById);

module.exports = router;
