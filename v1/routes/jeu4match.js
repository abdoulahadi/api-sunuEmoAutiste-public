const express = require('express');
const router = express.Router();
const jeu4MatchController = require('../controllers/jeu4MatchController');

/**
 * @swagger
 * /api/jeu4match:
 *   post:
 *     summary: Créer un nouveau match pour Jeu4
 *     tags: [Jeu4 Match]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matchItems:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste des éléments à associer
 *               category:
 *                 type: string
 *                 description: Catégorie du match
 *     responses:
 *       201:
 *         description: Match créé avec succès
 */
router.post('/', jeu4MatchController.createJeu4Match);

/**
 * @swagger
 * /api/jeu4match/{id}:
 *   get:
 *     summary: Obtenir un match de Jeu4 par ID
 *     tags: [Jeu4 Match]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du match
 *     responses:
 *       200:
 *         description: Informations du match
 */
router.get('/:id', jeu4MatchController.getJeu4MatchById);

/**
 * @swagger
 * /api/jeu4match:
 *   get:
 *     summary: Obtenir tous les matchs de Jeu4
 *     tags: [Jeu4 Match]
 *     responses:
 *       200:
 *         description: Liste de tous les matchs de Jeu4
 */
router.get('/', jeu4MatchController.getAllJeu4Matches);

/**
 * @swagger
 * /api/jeu4match/{id}:
 *   put:
 *     summary: Mettre à jour un match de Jeu4 par ID
 *     tags: [Jeu4 Match]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du match
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matchItems:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste des éléments à associer
 *               category:
 *                 type: string
 *                 description: Catégorie du match
 *     responses:
 *       200:
 *         description: Match mis à jour avec succès
 */
router.put('/:id', jeu4MatchController.updateJeu4Match);

/**
 * @swagger
 * /api/jeu4match/{id}:
 *   delete:
 *     summary: Supprimer un match de Jeu4 par ID
 *     tags: [Jeu4 Match]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du match
 *     responses:
 *       200:
 *         description: Match supprimé avec succès
 */
router.delete('/:id', jeu4MatchController.deleteJeu4Match);

module.exports = router;
