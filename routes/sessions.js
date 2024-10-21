const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// @route   POST api/sessions
// @desc    Faire la création d'une session
// @access  Public
router.post('/', sessionController.createSession);

// @route   GET api/sessions
// @desc    Récupérer tous les sessions
// @access  Public
router.get('/', sessionController.getAllSessions);

// @route   GET api/sessions
// @desc    Récupérer une session à travers son ID
// @access  Public
router.get('/:id', sessionController.getSessionById);

// @route   PUT api/sessions
// @desc    Modifier une session en utilisant l'id
// @access  Public
router.put('/:id', sessionController.updateSessionById);

// @route   DELETE api/sessions
// @desc    Supprimer une session en fournissan son ID
// @access  Public
router.delete('/:id', sessionController.deleteSessionById);

module.exports = router;
