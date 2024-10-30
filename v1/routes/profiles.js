const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Créer un nouveau profil
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               name:
 *                 type: string
 *                 description: Nom du profil
 *               age:
 *                 type: number
 *                 description: Âge de l'utilisateur
 *     responses:
 *       201:
 *         description: Profil créé avec succès
 */
router.post('/', profileController.createProfile);

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Obtenir tous les profils
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: Liste de tous les profils
 */
router.get('/', profileController.getAllProfiles);

/**
 * @swagger
 * /api/profiles/{id}:
 *   get:
 *     summary: Obtenir un profil par ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *     responses:
 *       200:
 *         description: Informations du profil
 */
router.get('/:id', profileController.getProfileById);

/**
 * @swagger
 * /api/profiles/user/{userId}:
 *   get:
 *     summary: Obtenir les profils par ID utilisateur
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des profils de l'utilisateur
 */
router.get('/user/:userId', profileController.getProfilesByUserId);

/**
 * @swagger
 * /api/profiles/{id}:
 *   put:
 *     summary: Mettre à jour un profil
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               name:
 *                 type: string
 *                 description: Nom du profil
 *               age:
 *                 type: number
 *                 description: Âge de l'utilisateur
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 */
router.put('/:id', profileController.updateProfile);

/**
 * @swagger
 * /api/profiles/{id}:
 *   delete:
 *     summary: Supprimer un profil
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *     responses:
 *       200:
 *         description: Profil supprimé avec succès
 */
router.delete('/:id', profileController.deleteProfile);

module.exports = router;
