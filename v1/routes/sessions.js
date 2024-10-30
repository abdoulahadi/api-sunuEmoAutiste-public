const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Créer une nouvelle session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur
 *               sessionData:
 *                 type: object
 *                 description: Données de la session
 *     responses:
 *       201:
 *         description: Session créée avec succès
 */
router.post('/', sessionController.createSession);

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     summary: Récupérer toutes les sessions
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Liste de toutes les sessions
 */
router.get('/', sessionController.getAllSessions);

/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     summary: Récupérer une session par ID
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la session
 *     responses:
 *       200:
 *         description: Informations de la session
 */
router.get('/:id', sessionController.getSessionById);

/**
 * @swagger
 * /api/sessions/{id}:
 *   put:
 *     summary: Modifier une session par ID
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionData:
 *                 type: object
 *                 description: Données de la session à mettre à jour
 *     responses:
 *       200:
 *         description: Session mise à jour avec succès
 */
router.put('/:id', sessionController.updateSessionById);

/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     summary: Supprimer une session par ID
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la session
 *     responses:
 *       200:
 *         description: Session supprimée avec succès
 */
router.delete('/:id', sessionController.deleteSessionById);

module.exports = router;
