const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

router.get('/:userId', getUserById);

module.exports = router;
