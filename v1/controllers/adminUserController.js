const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/adminUser');

const JWT_SECRET = 'SuperSecretAdminKey';

// Inscription d'un nouvel administrateur
exports.registerAdmin = async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
    }

    try {
        const existingUser = await AdminUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        const newAdmin = new AdminUser({ username, email, password, role });
        await newAdmin.save();
        res.status(201).json({ message: 'Administrateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'administrateur', error });
    }
};

// Connexion d'un administrateur
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Veuillez entrer tous les champs' });
    }

    try {
        const admin = await AdminUser.findOne({ email });
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(400).json({ message: 'Identifiants invalides' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: admin._id, username: admin.username, email: admin.email, role: admin.role } });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
};

// Récupérer tous les administrateurs
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminUser.find().select('-password');
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des administrateurs', error });
    }
};

// Récupérer un administrateur par ID
exports.getAdminById = async (req, res) => {
    try {
        const admin = await AdminUser.findById(req.params.id).select('-password');
        if (!admin) {
            return res.status(404).json({ message: 'Administrateur non trouvé' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'administrateur', error });
    }
};

// Mise à jour d'un administrateur
exports.updateAdmin = async (req, res) => {
    const { username, email, role } = req.body;

    try {
        const updatedAdmin = await AdminUser.findByIdAndUpdate(
            req.params.id,
            { username, email, role },
            { new: true }
        ).select('-password');
        
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Administrateur non trouvé' });
        }
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
    }
};

// Suppression d'un administrateur
exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await AdminUser.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Administrateur non trouvé' });
        }
        res.status(200).json({ message: 'Administrateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression', error });
    }
};
