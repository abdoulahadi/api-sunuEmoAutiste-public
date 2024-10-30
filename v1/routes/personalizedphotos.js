const express = require('express');
const router = express.Router();
const personalizedPhotoController = require('../controllers/personalizedPhotoController');

/**
 * @swagger
 * /api/personalizedphotos:
 *   post:
 *     summary: Créer une nouvelle photo personnalisée
 *     tags: [Personalized Photos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileId:
 *                 type: string
 *               emotion:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 description: URL de l'image
 *     responses:
 *       201:
 *         description: Photo personnalisée créée avec succès
 */
router.post('/', personalizedPhotoController.createPersonalizedPhoto);

/**
 * @swagger
 * /api/personalizedphotos/profile/{profileId}:
 *   get:
 *     summary: Obtenir toutes les images d'un utilisateur triées par émotions
 *     tags: [Personalized Photos]
 *     parameters:
 *       - in: path
 *         name: profileId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil utilisateur
 *     responses:
 *       200:
 *         description: Liste des images triées par émotions
 */
router.get('/profile/:profileId', personalizedPhotoController.getImagesByProfileSortedByEmotion);

/**
 * @swagger
 * /api/personalizedphotos/{id}:
 *   get:
 *     summary: Obtenir une photo personnalisée par ID
 *     tags: [Personalized Photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la photo personnalisée
 *     responses:
 *       200:
 *         description: Informations de la photo personnalisée
 */
router.get('/:id', personalizedPhotoController.getPersonalizedPhotoById);

/**
 * @swagger
 * /api/personalizedphotos:
 *   get:
 *     summary: Obtenir toutes les photos personnalisées
 *     tags: [Personalized Photos]
 *     responses:
 *       200:
 *         description: Liste de toutes les photos personnalisées
 */
router.get('/', personalizedPhotoController.getAllPersonalizedPhotos);

/**
 * @swagger
 * /api/personalizedphotos/{id}:
 *   put:
 *     summary: Mettre à jour une photo personnalisée par ID
 *     tags: [Personalized Photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la photo personnalisée
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileId:
 *                 type: string
 *               emotion:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 description: URL de l'image
 *     responses:
 *       200:
 *         description: Photo personnalisée mise à jour avec succès
 */
router.put('/:id', personalizedPhotoController.updatePersonalizedPhoto);

/**
 * @swagger
 * /api/personalizedphotos/{id}:
 *   delete:
 *     summary: Supprimer une photo personnalisée par ID
 *     tags: [Personalized Photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la photo personnalisée
 *     responses:
 *       200:
 *         description: Photo personnalisée supprimée avec succès
 */
router.delete('/:id', personalizedPhotoController.deletePersonalizedPhoto);

module.exports = router;
