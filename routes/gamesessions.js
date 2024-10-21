const express = require('express');
const router = express.Router();
const gameSessionController = require('../controllers/gameSessionController');

// @route   GET api/game_sessions/average/:user_id
// @desc    Get average play time per day for a profile
// @access  Public
router.get('/average/:user_id', gameSessionController.getAveragePlayTimePerDay);

// @route   GET api/game_sessions/allplaytime/:user_id
// @desc    Get all play time for a profile
// @access  Public
router.get('/allplaytime/:user_id', gameSessionController.getAllPlayTime);

// @route   POST api/game_sessions
// @desc    Create a new Game Session
// @access  Public
router.post('/', gameSessionController.createGameSession);

// @route   GET api/game_sessions/:id
// @desc    Get a Game Session by ID
// @access  Public
router.get('/:id', gameSessionController.getGameSessionById);

// @route   GET api/game_sessions
// @desc    Get all Game Sessions
// @access  Public
router.get('/', gameSessionController.getAllGameSessions);

// @route   PUT api/game_sessions/:id
// @desc    Update a Game Session by ID
// @access  Public
router.put('/:id', gameSessionController.updateGameSession);

// @route   DELETE api/game_sessions/:id
// @desc    Delete a Game Session by ID
// @access  Public
router.delete('/:id', gameSessionController.deleteGameSession);

module.exports = router;