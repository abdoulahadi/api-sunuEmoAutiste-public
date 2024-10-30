const express = require('express');
const router = express.Router();
const emotionController = require('../controllers/emotionController');

/**
 * @swagger
 * /api/emotions:
 *   post:
 *     summary: Créer une émotion
 *     tags: [Emotions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               intensity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Émotion créée avec succès
 */
router.post('/', emotionController.createEmotion);

/**
 * @swagger
 * /api/emotions:
 *   get:
 *     summary: Obtenir toutes les émotions
 *     tags: [Emotions]
 *     responses:
 *       200:
 *         description: Liste de toutes les émotions
 */
router.get('/', emotionController.getAllEmotions);

/**
 * @swagger
 * /api/emotions/{id}:
 *   get:
 *     summary: Obtenir une émotion par ID
 *     tags: [Emotions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'émotion
 *     responses:
 *       200:
 *         description: Informations de l'émotion
 */
router.get('/:id', emotionController.getEmotionById);

/**
 * @swagger
 * /api/emotions/{id}:
 *   put:
 *     summary: Mettre à jour une émotion par ID
 *     tags: [Emotions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'émotion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               intensity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Émotion mise à jour avec succès
 */
router.put('/:id', emotionController.updateEmotionById);

/**
 * @swagger
 * /api/emotions/{id}:
 *   delete:
 *     summary: Supprimer une émotion par ID
 *     tags: [Emotions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'émotion
 *     responses:
 *       200:
 *         description: Émotion supprimée avec succès
 */
router.delete('/:id', emotionController.deleteEmotionById);

/**
 * @swagger
 * /api/emotions:
 *   delete:
 *     summary: Supprimer plusieurs émotions
 *     tags: [Emotions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Émotions supprimées avec succès
 */
router.delete('/', emotionController.deleteEmotionsByIds);

module.exports = router;
