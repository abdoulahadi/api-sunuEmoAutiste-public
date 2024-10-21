const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// @route   POST api/profiles
// @desc    Create a profile
// @access  Public
router.post('/', profileController.createProfile);

// @route   GET api/profiles
// @desc    Get all profiles
// @access  Public
router.get('/', profileController.getAllProfiles);

// @route   GET api/profiles/:id
// @desc    Get profile by ID
// @access  Public
router.get('/:id', profileController.getProfileById);

// @route   GET api/profiles/user/:userId
// @desc    Get profiles by user ID
// @access  Public
router.get('/user/:userId', profileController.getProfilesByUserId);

// @route   PUT api/profiles/:id
// @desc    Update a profile
// @access  Public
router.put('/:id', profileController.updateProfile);

// @route   DELETE api/profiles/:id
// @desc    Delete a profile
// @access  Public
router.delete('/:id', profileController.deleteProfile);

module.exports = router;
