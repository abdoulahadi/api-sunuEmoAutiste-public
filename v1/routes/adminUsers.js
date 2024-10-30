const express = require('express');
const router = express.Router();
const adminUserController = require('../controllers/adminUserController');

/**
 * @route POST /api/admin-users/register
 * @desc Inscription d'un administrateur
 */
router.post('/register', adminUserController.registerAdmin);

/**
 * @route POST /api/admin-users/login
 * @desc Connexion d'un administrateur
 */
router.post('/login', adminUserController.loginAdmin);

/**
 * @route GET /api/admin-users
 * @desc Récupérer tous les administrateurs
 */
router.get('/', adminUserController.getAllAdmins);

/**
 * @route GET /api/admin-users/:id
 * @desc Récupérer un administrateur par ID
 */
router.get('/:id', adminUserController.getAdminById);

/**
 * @route PUT /api/admin-users/:id
 * @desc Mettre à jour un administrateur
 */
router.put('/:id', adminUserController.updateAdmin);

/**
 * @route DELETE /api/admin-users/:id
 * @desc Supprimer un administrateur
 */
router.delete('/:id', adminUserController.deleteAdmin);

module.exports = router;
