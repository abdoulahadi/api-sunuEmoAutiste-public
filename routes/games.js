const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// @route   POST api/games
// @desc    Create a new Game
// @access  Public
router.post('/', gameController.createGame);

// @route   GET api/games/:id
// @desc    Get a Game by ID
// @access  Public
router.get('/:id', gameController.getGameById);

// @route   GET api/games
// @desc    Get all Games
// @access  Public
router.get('/', gameController.getAllGames);

// @route   PUT api/games/:id
// @desc    Update a Game by ID
// @access  Public
router.put('/:id', gameController.updateGame);

// @route   DELETE api/games/:id
// @desc    Delete a Game by ID
// @access  Public
router.delete('/:id', gameController.deleteGame);

module.exports = router;
