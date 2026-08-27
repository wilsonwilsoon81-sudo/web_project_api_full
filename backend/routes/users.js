const express = require('express');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const {
  validateUserUpdate,
  validateAvatarUpdate,
  validateUserId,
} = require('../middlewares/validations');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.patch('/me', validateUserUpdate, updateUserProfile);
router.patch('/me/avatar', validateAvatarUpdate, updateUserAvatar);
router.get('/:userId', validateUserId, getUserById);

module.exports = router;
