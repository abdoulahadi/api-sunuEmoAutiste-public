const express = require('express');
const router = express.Router();
const jeu4MatchController = require('../controllers/jeu4MatchController');

// @route   POST api/jeu4match
// @desc    Create a new Jeu4Match
// @access  Public
router.post('/', jeu4MatchController.createJeu4Match);

// @route   GET api/jeu4match/:id
// @desc    Get a Jeu4Match by ID
// @access  Public
router.get('/:id', jeu4MatchController.getJeu4MatchById);

// @route   GET api/jeu4match
// @desc    Get all Jeu4Matches
// @access  Public
router.get('/', jeu4MatchController.getAllJeu4Matches);

// @route   PUT api/jeu4match/:id
// @desc    Update a Jeu4Match by ID
// @access  Public
router.put('/:id', jeu4MatchController.updateJeu4Match);

// @route   DELETE api/jeu4match/:id
// @desc    Delete a Jeu4Match by ID
// @access  Public
router.delete('/:id', jeu4MatchController.deleteJeu4Match);

module.exports = router;
