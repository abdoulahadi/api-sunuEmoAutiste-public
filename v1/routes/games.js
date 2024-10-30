const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Créer un nouveau jeu
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               genre:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Jeu créé avec succès
 */
router.post('/', gameController.createGame);

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Obtenir un jeu par ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du jeu
 *     responses:
 *       200:
 *         description: Informations du jeu
 */
router.get('/:id', gameController.getGameById);

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Obtenir tous les jeux
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Liste de tous les jeux
 */
router.get('/', gameController.getAllGames);

/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     summary: Mettre à jour un jeu par ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du jeu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               genre:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Jeu mis à jour avec succès
 */
router.put('/:id', gameController.updateGame);

/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     summary: Supprimer un jeu par ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du jeu
 *     responses:
 *       200:
 *         description: Jeu supprimé avec succès
 */
router.delete('/:id', gameController.deleteGame);

module.exports = router;
