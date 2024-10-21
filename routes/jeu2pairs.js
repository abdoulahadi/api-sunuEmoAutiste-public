const express = require('express');
const router = express.Router();
const jeu2PairsController = require('../controllers/jeu2PairsController');

// @route   POST api/jeu2pairs
// @desc    Create a new Jeu2Pair
// @access  Public
router.post('/', jeu2PairsController.createJeu2Pair);

// @route   GET api/jeu2pairs/:id
// @desc    Get a Jeu2Pair by ID
// @access  Public
router.get('/:id', jeu2PairsController.getJeu2PairById);

// @route   GET api/jeu2pairs
// @desc    Get all Jeu2Pairs
// @access  Public
router.get('/', jeu2PairsController.getAllJeu2Pairs);

// @route   PUT api/jeu2pairs/:id
// @desc    Update a Jeu2Pair by ID
// @access  Public
router.put('/:id', jeu2PairsController.updateJeu2Pair);

// @route   DELETE api/jeu2pairs/:id
// @desc    Delete a Jeu2Pair by ID
// @access  Public
router.delete('/:id', jeu2PairsController.deleteJeu2Pair);

module.exports = router;
