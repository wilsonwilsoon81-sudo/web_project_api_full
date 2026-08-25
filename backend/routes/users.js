const express = require('express');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

router.get('/:userId', getUserById);

module.exports = router;
