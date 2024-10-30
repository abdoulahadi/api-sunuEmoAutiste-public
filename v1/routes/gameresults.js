const express = require('express');
const router = express.Router();
const gameResultController = require('../controllers/gameResultController');

/**
 * @swagger
 * /api/game-results/aggregates:
 *   get:
 *     summary: Obtenir les agrégats globaux et par utilisateur pour chaque jeu
 *     tags: [Game Results]
 *     responses:
 *       200:
 *         description: Liste des agrégats globaux et par utilisateur
 */
router.get('/aggregates', gameResultController.getAggregates);

/**
 * @swagger
 * /api/game-results/aggregates/profile/{profileId}:
 *   get:
 *     summary: Obtenir les agrégats pour un utilisateur spécifique
 *     tags: [Game Results]
 *     parameters:
 *       - in: path
 *         name: profileId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil utilisateur
 *     responses:
 *       200:
 *         description: Agrégats pour un utilisateur spécifique
 */
router.get('/aggregates/profile/:profileId', gameResultController.getProfileAggregates);

/**
 * @swagger
 * /api/game-results/top-scores/{profileId}/{gameId}:
 *   get:
 *     summary: Obtenir le top 3 des meilleurs scores pour chaque jeu
 *     tags: [Game Results]
 *     parameters:
 *       - in: path
 *         name: profileId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil utilisateur
 *       - in: path
 *         name: gameId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du jeu
 *     responses:
 *       200:
 *         description: Top 3 des meilleurs scores
 */
router.get('/top-scores/:profileId/:gameId', gameResultController.getTop3ScoresPerGame);

/**
 * @swagger
 * /api/game-results:
 *   post:
 *     summary: Créer un résultat de jeu
 *     tags: [Game Results]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *               gameId:
 *                 type: string
 *               profileId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Résultat de jeu créé
 */
router.post('/', gameResultController.createGameResult);

/**
 * @swagger
 * /api/game-results:
 *   get:
 *     summary: Obtenir tous les résultats de jeu
 *     tags: [Game Results]
 *     responses:
 *       200:
 *         description: Liste de tous les résultats de jeu
 */
router.get('/', gameResultController.getAllGameResults);

/**
 * @swagger
 * /api/game-results/{id}:
 *   get:
 *     summary: Obtenir un résultat de jeu par ID
 *     tags: [Game Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du résultat de jeu
 *     responses:
 *       200:
 *         description: Informations du résultat de jeu
 */
router.get('/:id', gameResultController.getGameResultById);

/**
 * @swagger
 * /api/game-results/{id}:
 *   put:
 *     summary: Mettre à jour un résultat de jeu
 *     tags: [Game Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du résultat de jeu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *               gameId:
 *                 type: string
 *               profileId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Résultat de jeu mis à jour
 */
router.put('/:id', gameResultController.updateGameResult);

/**
 * @swagger
 * /api/game-results/{id}:
 *   delete:
 *     summary: Supprimer un résultat de jeu
 *     tags: [Game Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du résultat de jeu
 *     responses:
 *       200:
 *         description: Résultat de jeu supprimé
 */
router.delete('/:id', gameResultController.deleteGameResult);

module.exports = router;
