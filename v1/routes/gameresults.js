const express = require('express');
const router = express.Router();
const gameResultController = require('../controllers/gameResultController');

// Routes spécifiques d'abord
// @route   GET api/game-results/aggregates
// @desc    Obtenir les agrégats globaux et par utilisateur pour chaque jeu
// @access  Public
router.get('/aggregates', gameResultController.getAggregates);

// @route   GET api/game-results/aggregates/profile/:profileId
// @desc    Obtenir les agrégats pour un utilisateur spécifique
// @access  Public
router.get('/aggregates/profile/:profileId', gameResultController.getProfileAggregates);

// @route   GET api/game-results/top-scores/:profileId/:gameId
// @desc    Obtenir le top 3 des meilleurs scores pour chaque jeu
// @access  Public
router.get('/top-scores/:profileId/:gameId', gameResultController.getTop3ScoresPerGame);

// Routes génériques ensuite
// @route   POST api/game-results
// @desc    Créer un résultat de jeu
// @access  Public
router.post('/', gameResultController.createGameResult);

// @route   GET api/game-results
// @desc    Obtenir tous les résultats de jeu
// @access  Public
router.get('/', gameResultController.getAllGameResults);

// @route   GET api/game-results/:id
// @desc    Obtenir un résultat de jeu par ID
// @access  Public
router.get('/:id', gameResultController.getGameResultById);

// @route   PUT api/game-results/:id
// @desc    Mettre à jour un résultat de jeu
// @access  Public
router.put('/:id', gameResultController.updateGameResult);

// @route   DELETE api/game-results/:id
// @desc    Supprimer un résultat de jeu
// @access  Public
router.delete('/:id', gameResultController.deleteGameResult);

module.exports = router;