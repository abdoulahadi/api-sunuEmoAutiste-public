const express = require('express');
const router = express.Router();
const jeu2PairsController = require('../controllers/jeu2PairsController');

/**
 * @swagger
 * /api/jeu2pairs:
 *   post:
 *     summary: Créer une nouvelle paire pour Jeu2
 *     tags: [Jeu2 Pairs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pair:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste des éléments de la paire
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paire créée avec succès
 */
router.post('/', jeu2PairsController.createJeu2Pair);

/**
 * @swagger
 * /api/jeu2pairs/{id}:
 *   get:
 *     summary: Obtenir une paire de Jeu2 par ID
 *     tags: [Jeu2 Pairs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la paire
 *     responses:
 *       200:
 *         description: Informations de la paire
 */
router.get('/:id', jeu2PairsController.getJeu2PairById);

/**
 * @swagger
 * /api/jeu2pairs:
 *   get:
 *     summary: Obtenir toutes les paires de Jeu2
 *     tags: [Jeu2 Pairs]
 *     responses:
 *       200:
 *         description: Liste de toutes les paires de Jeu2
 */
router.get('/', jeu2PairsController.getAllJeu2Pairs);

/**
 * @swagger
 * /api/jeu2pairs/{id}:
 *   put:
 *     summary: Mettre à jour une paire de Jeu2 par ID
 *     tags: [Jeu2 Pairs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la paire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pair:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste des éléments de la paire
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paire mise à jour avec succès
 */
router.put('/:id', jeu2PairsController.updateJeu2Pair);

/**
 * @swagger
 * /api/jeu2pairs/{id}:
 *   delete:
 *     summary: Supprimer une paire de Jeu2 par ID
 *     tags: [Jeu2 Pairs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la paire
 *     responses:
 *       200:
 *         description: Paire supprimée avec succès
 */
router.delete('/:id', jeu2PairsController.deleteJeu2Pair);

module.exports = router;
