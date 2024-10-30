const express = require('express');
const router = express.Router();
const gameSessionController = require('../controllers/gameSessionController');

/**
 * @swagger
 * /api/game_sessions/average/{user_id}:
 *   get:
 *     summary: Obtenir le temps de jeu moyen par jour pour un profil
 *     tags: [Game Sessions]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Temps de jeu moyen par jour pour un profil
 */
router.get('/average/:user_id', gameSessionController.getAveragePlayTimePerDay);

/**
 * @swagger
 * /api/game_sessions/allplaytime/{user_id}:
 *   get:
 *     summary: Obtenir tout le temps de jeu pour un profil
 *     tags: [Game Sessions]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Tout le temps de jeu pour un profil
 */
router.get('/allplaytime/:user_id', gameSessionController.getAllPlayTime);

/**
 * @swagger
 * /api/game_sessions:
 *   post:
 *     summary: Créer une nouvelle session de jeu
 *     tags: [Game Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               gameId:
 *                 type: string
 *               duration:
 *                 type: number
 *                 description: Durée de la session en minutes
 *     responses:
 *       201:
 *         description: Session de jeu créée avec succès
 */
router.post('/', gameSessionController.createGameSession);

/**
 * @swagger
 * /api/game_sessions/{id}:
 *   get:
 *     summary: Obtenir une session de jeu par ID
 *     tags: [Game Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la session de jeu
 *     responses:
 *       200:
 *         description: Informations de la session de jeu
 */
router.get('/:id', gameSessionController.getGameSessionById);

/**
 * @swagger
 * /api/game_sessions:
 *   get:
 *     summary: Obtenir toutes les sessions de jeu
 *     tags: [Game Sessions]
 *     responses:
 *       200:
 *         description: Liste de toutes les sessions de jeu
 */
router.get('/', gameSessionController.getAllGameSessions);

/**
 * @swagger
 * /api/game_sessions/{id}:
 *   put:
 *     summary: Mettre à jour une session de jeu par ID
 *     tags: [Game Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la session de jeu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               gameId:
 *                 type: string
 *               duration:
 *                 type: number
 *                 description: Durée de la session en minutes
 *     responses:
 *       200:
 *         description: Session de jeu mise à jour avec succès
 */
router.put('/:id', gameSessionController.updateGameSession);

/**
 * @swagger
 * /api/game_sessions/{id}:
 *   delete:
 *     summary: Supprimer une session de jeu par ID
 *     tags: [Game Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la session de jeu
 *     responses:
 *       200:
 *         description: Session de jeu supprimée avec succès
 */
router.delete('/:id', gameSessionController.deleteGameSession);

module.exports = router;
