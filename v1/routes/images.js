// src/routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const multer = require('multer');

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/emotions');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/images:
 *   post:
 *     summary: Créer des images et les associer à une émotion
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Images créées avec succès
 */
router.post('/', upload.array('images', 10), imageController.createImages);

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Obtenir toutes les images
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Liste de toutes les images
 */
router.get('/', imageController.getAllImages);

/**
 * @swagger
 * /api/images/{id}:
 *   get:
 *     summary: Obtenir une image par ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'image
 *     responses:
 *       200:
 *         description: Informations de l'image
 */
router.get('/:id', imageController.getImageById);

/**
 * @swagger
 * /api/images/emotion/{emotionId}:
 *   get:
 *     summary: Obtenir des images par EmotionID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: emotionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'émotion
 *     responses:
 *       200:
 *         description: Liste des images associées à l'émotion
 */
router.get('/emotion/:emotionId', imageController.getImagesByEmotionId);

/**
 * @swagger
 * /api/images/{id}:
 *   put:
 *     summary: Mettre à jour une image existante
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               newImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image mise à jour avec succès
 */
router.put('/:id', upload.single('newImage'), imageController.updateImage);

/**
 * @swagger
 * /api/images/{id}:
 *   delete:
 *     summary: Supprimer une image par ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'image
 *     responses:
 *       200:
 *         description: Image supprimée avec succès
 */
router.delete('/:id', imageController.deleteImageById);

/**
 * @swagger
 * /api/images:
 *   delete:
 *     summary: Supprimer plusieurs images par IDs
 *     tags: [Images]
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
 *         description: Images supprimées avec succès
 */
router.delete('/', imageController.deleteImagesByIds);

module.exports = router;
