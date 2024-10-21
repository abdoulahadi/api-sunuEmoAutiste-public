const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/', userController.registerUser);

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', userController.loginUser);

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', userController.getUserById);

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', userController.getAllUsers);

// @route   PUT api/users/:id
// @desc    Update user
// @access  Public
router.put('/:id', userController.updateUser);

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Public
router.delete('/:id', userController.deleteUser);

module.exports = router;
