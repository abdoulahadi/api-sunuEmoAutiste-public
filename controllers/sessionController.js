const Session = require('../models/Session');

// Créer une session
exports.createSession = async (req, res) => {
    const { ProfileID, StartTime, EndTime } = req.body;
    try {
        const newSession = new Session({ ProfileID, StartTime, EndTime });
        const session = await newSession.save();
        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtenir toutes les sessions
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find().populate('ProfileID');
        res.status(200).json(sessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtenir une session par ID
exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id).populate('ProfileID');
        if (!session) {
            return res.status(404).json({ message: 'Session non trouvée' });
        }
        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mettre à jour une session par ID
exports.updateSessionById = async (req, res) => {
    try {
        const { ProfileID, StartTime, EndTime } = req.body;
        let session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Session non trouvée' });
        }

        session.ProfileID = ProfileID;
        session.StartTime = StartTime;
        session.EndTime = EndTime;

        session = await session.save();
        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer une session par ID
exports.deleteSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Session non trouvée' });
        }
        await session.remove();
        res.status(200).json({ message: 'Session supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
