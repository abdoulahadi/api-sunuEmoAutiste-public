const express = require('express');
const router = express.Router();
const personalizedPhotoController = require('../controllers/personalizedPhotoController');

// @route   POST api/personalizedphotos
// @desc    Create a new Personalized Photo
// @access  Public
router.post('/', personalizedPhotoController.createPersonalizedPhoto);
// @route   GET api/personalizedphotos/:profileId
// @desc    Get all Images of a User sorted by Emotions
// @access  Public
router.get('/profile/:profileId', personalizedPhotoController.getImagesByProfileSortedByEmotion);

// @route   GET api/personalizedphotos/:id
// @desc    Get a Personalized Photo by ID
// @access  Public
router.get('/:id', personalizedPhotoController.getPersonalizedPhotoById);

// @route   GET api/personalizedphotos
// @desc    Get all Personalized Photos
// @access  Public
router.get('/', personalizedPhotoController.getAllPersonalizedPhotos);

// @route   PUT api/personalizedphotos/:id
// @desc    Update a Personalized Photo by ID
// @access  Public
router.put('/:id', personalizedPhotoController.updatePersonalizedPhoto);

// @route   DELETE api/personalizedphotos/:id
// @desc    Delete a Personalized Photo by ID
// @access  Public
router.delete('/:id', personalizedPhotoController.deletePersonalizedPhoto);


module.exports = router;
