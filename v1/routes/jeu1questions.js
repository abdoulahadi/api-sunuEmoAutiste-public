const express = require('express');
const router = express.Router();
const jeu1QuestionController = require('../controllers/jeu1QuestionController');

/**
 * @swagger
 * /api/jeu1questions:
 *   post:
 *     summary: Créer une nouvelle question pour Jeu1
 *     tags: [Jeu1 Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswer:
 *                 type: string
 *     responses:
 *       201:
 *         description: Question créée avec succès
 */
router.post('/', jeu1QuestionController.createJeu1Question);

/**
 * @swagger
 * /api/jeu1questions/{id}:
 *   get:
 *     summary: Obtenir une question de Jeu1 par ID
 *     tags: [Jeu1 Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la question
 *     responses:
 *       200:
 *         description: Informations de la question
 */
router.get('/:id', jeu1QuestionController.getJeu1QuestionById);

/**
 * @swagger
 * /api/jeu1questions:
 *   get:
 *     summary: Obtenir toutes les questions de Jeu1
 *     tags: [Jeu1 Questions]
 *     responses:
 *       200:
 *         description: Liste de toutes les questions de Jeu1
 */
router.get('/', jeu1QuestionController.getAllJeu1Questions);

/**
 * @swagger
 * /api/jeu1questions/{id}:
 *   put:
 *     summary: Mettre à jour une question de Jeu1 par ID
 *     tags: [Jeu1 Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Question mise à jour avec succès
 */
router.put('/:id', jeu1QuestionController.updateJeu1Question);

/**
 * @swagger
 * /api/jeu1questions/{id}:
 *   delete:
 *     summary: Supprimer une question de Jeu1 par ID
 *     tags: [Jeu1 Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la question
 *     responses:
 *       200:
 *         description: Question supprimée avec succès
 */
router.delete('/:id', jeu1QuestionController.deleteJeu1Question);

module.exports = router;
