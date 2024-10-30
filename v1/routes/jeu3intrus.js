const express = require('express');
const router = express.Router();
const jeu3IntrusController = require('../controllers/jeu3IntrusController');

/**
 * @swagger
 * /api/jeu3intrus:
 *   post:
 *     summary: Créer un nouvel intrus pour Jeu3
 *     tags: [Jeu3 Intrus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste des éléments parmi lesquels se trouve l'intrus
 *               intrus:
 *                 type: string
 *                 description: Élément intrus
 *     responses:
 *       201:
 *         description: Intrus créé avec succès
 */
router.post('/', jeu3IntrusController.createJeu3Intrus);

/**
 * @swagger
 * /api/jeu3intrus/{id}:
 *   get:
 *     summary: Obtenir un intrus de Jeu3 par ID
 *     tags: [Jeu3 Intrus]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'intrus
 *     responses:
 *       200:
 *         description: Informations de l'intrus
 */
router.get('/:id', jeu3IntrusController.getJeu3IntrusById);

/**
 * @swagger
 * /api/jeu3intrus:
 *   get:
 *     summary: Obtenir tous les intrus de Jeu3
 *     tags: [Jeu3 Intrus]
 *     responses:
 *       200:
 *         description: Liste de tous les intrus de Jeu3
 */
router.get('/', jeu3IntrusController.getAllJeu3Intrus);

/**
 * @swagger
 * /api/jeu3intrus/{id}:
 *   put:
 *     summary: Mettre à jour un intrus de Jeu3 par ID
 *     tags: [Jeu3 Intrus]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'intrus
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste des éléments parmi lesquels se trouve l'intrus
 *               intrus:
 *                 type: string
 *                 description: Élément intrus
 *     responses:
 *       200:
 *         description: Intrus mis à jour avec succès
 */
router.put('/:id', jeu3IntrusController.updateJeu3Intrus);

/**
 * @swagger
 * /api/jeu3intrus/{id}:
 *   delete:
 *     summary: Supprimer un intrus de Jeu3 par ID
 *     tags: [Jeu3 Intrus]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'intrus
 *     responses:
 *       200:
 *         description: Intrus supprimé avec succès
 */
router.delete('/:id', jeu3IntrusController.deleteJeu3Intrus);

module.exports = router;
