const express = require('express');
const router = express.Router();
const jeu3IntrusController = require('../controllers/jeu3IntrusController');

// @route   POST api/jeu3intrus
// @desc    Create a new Jeu3Intrus
// @access  Public
router.post('/', jeu3IntrusController.createJeu3Intrus);

// @route   GET api/jeu3intrus/:id
// @desc    Get a Jeu3Intrus by ID
// @access  Public
router.get('/:id', jeu3IntrusController.getJeu3IntrusById);

// @route   GET api/jeu3intrus
// @desc    Get all Jeu3Intrus
// @access  Public
router.get('/', jeu3IntrusController.getAllJeu3Intrus);

// @route   PUT api/jeu3intrus/:id
// @desc    Update a Jeu3Intrus by ID
// @access  Public
router.put('/:id', jeu3IntrusController.updateJeu3Intrus);

// @route   DELETE api/jeu3intrus/:id
// @desc    Delete a Jeu3Intrus by ID
// @access  Public
router.delete('/:id', jeu3IntrusController.deleteJeu3Intrus);

module.exports = router;
