const express = require('express');
const router = express.Router();
const emotionController = require('../controllers/emotionController');

router.post('/', emotionController.createEmotion);
router.get('/', emotionController.getAllEmotions);
router.get('/:id', emotionController.getEmotionById);
router.put('/:id', emotionController.updateEmotionById);
router.delete('/:id', emotionController.deleteEmotionById);
router.delete('/', emotionController.deleteEmotionsByIds);

module.exports = router;
