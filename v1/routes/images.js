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

// Créer des images et les associer à une émotion
router.post('/', upload.array('images', 10), imageController.createImages);

// Obtenir toutes les images
router.get('/', imageController.getAllImages);

// Obtenir une image par ID
router.get('/:id', imageController.getImageById);

// Obtenir des images par EmotionID
router.get('/emotion/:emotionId', imageController.getImagesByEmotionId);

// // Mettre à jour une image par ID
// router.put('/:id', imageController.updateImageById);

// Editer une image existante
router.put('/:id', upload.single('newImage'), imageController.updateImage);

// Supprimer une image par ID
router.delete('/:id', imageController.deleteImageById);

// Supprimer plusieurs images par IDs
router.delete('/', imageController.deleteImagesByIds);

module.exports = router;
