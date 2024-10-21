const express = require('express');
const router = express.Router();
const jeu1QuestionController = require('../controllers/jeu1QuestionController');

// @route   POST api/jeu1questions
// @desc    Create a new Jeu1Question
// @access  Public
router.post('/', jeu1QuestionController.createJeu1Question);

// @route   GET api/jeu1questions/:id
// @desc    Get a Jeu1Question by ID
// @access  Public
router.get('/:id', jeu1QuestionController.getJeu1QuestionById);

// @route   GET api/jeu1questions
// @desc    Get all Jeu1Questions
// @access  Public
router.get('/', jeu1QuestionController.getAllJeu1Questions);

// @route   PUT api/jeu1questions/:id
// @desc    Update a Jeu1Question by ID
// @access  Public
router.put('/:id', jeu1QuestionController.updateJeu1Question);

// @route   DELETE api/jeu1questions/:id
// @desc    Delete a Jeu1Question by ID
// @access  Public
router.delete('/:id', jeu1QuestionController.deleteJeu1Question);

module.exports = router;
