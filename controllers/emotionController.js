const Emotion = require('../models/Emotion');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Créer une émotion
exports.createEmotion = async (req, res) => {
    const { EmotionName } = req.body;
    try {
        const newEmotion = new Emotion({ EmotionName });
        const emotion = await newEmotion.save();
        res.status(201).json(emotion);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtenir toutes les émotions avec pagination, tri et filtrage
// exports.getAllEmotions = async (req, res) => {
//     try {
//         // Extraction et parsing des paramètres de requête
//         const sort = req.query.sort ? JSON.parse(req.query.sort) : ['id', 'ASC'];
//         const range = req.query.range ? JSON.parse(req.query.range) : [0, 9];
//         const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

//         const [sortField, sortOrder] = sort;
//         const [rangeStart, rangeEnd] = range;

//         const limit = rangeEnd - rangeStart + 1;
//         const skip = rangeStart;

//         // Comptage total des documents
//         const total = await Emotion.countDocuments(filter);
//         // Recherche des émotions avec les filtres, tri et pagination
//         const emotions = await Emotion.find(filter)
//             .sort({ [sortField]: sortOrder === 'ASC' ? 1 : -1 })
//             .skip(skip)
//             .limit(limit);

//         // Configuration de l'en-tête Content-Range
//         res.set('Content-Range', `emotions ${rangeStart}-${rangeEnd}/${total}`);
//         res.status(200).json(emotions);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


exports.getAllEmotions = async (req, res) => {
    try {
        const { sort, range, filter } = req.query;

        // Parser les paramètres de requête
        const sortParsed = sort ? JSON.parse(sort) : [];
        const rangeParsed = range ? JSON.parse(range) : [0, 10];
        const filterParsed = filter ? JSON.parse(filter) : {};

        const sortField = sortParsed[0] || '_id'; // Utiliser '_id' par défaut si non spécifié
        const sortOrder = sortParsed[1] === 'ASC' ? 1 : -1;

        const start = rangeParsed[0];
        const end = rangeParsed[1];
        const limit = end - start + 1;

        // Construire la requête en utilisant filterParsed
        let query = {};
        console.log(Array.isArray(filterParsed.id))
        if (filterParsed.id) {
            // Si filterParsed.id est un tableau d'objets, extraire les IDs
            if (Array.isArray(filterParsed.id)) {
                const ids = filterParsed.id.map(item => {
                    if (item.id && ObjectId.isValid(item.id)) {
                        return new ObjectId(item.id);
                    }
                    return null;
                }).filter(id => id !== null); // Filtrer les IDs invalides
                query._id = { $in: ids };
            } else if (ObjectId.isValid(filterParsed.id)) {
                query._id = ObjectId(filterParsed.id);
            }
        } else {
            query = filterParsed;
        }

        const emotions = await Emotion.find(query)
            .sort({ [sortField]: sortOrder })
            .skip(start)
            .limit(limit);

        const total = await Emotion.countDocuments(query);

        res.setHeader('Content-Range', `emotions ${start}-${end}/${total}`);
        res.status(200).json(emotions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Obtenir une émotion par ID
exports.getEmotionById = async (req, res) => {
    try {
        const emotion = await Emotion.findById(req.params.id);
        if (!emotion) {
            return res.status(404).json({ message: 'Émotion non trouvée' });
        }
        res.status(200).json(emotion);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mettre à jour une émotion par ID
exports.updateEmotionById = async (req, res) => {
    try {
        const { EmotionName } = req.body;
        let emotion = await Emotion.findById(req.params.id);
        if (!emotion) {
            return res.status(404).json({ message: 'Émotion non trouvée' });
        }

        emotion.EmotionName = EmotionName;
        emotion = await emotion.save();
        res.status(200).json(emotion);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer une émotion par ID
exports.deleteEmotionById = async (req, res) => {
    try {
        const emotion = await Emotion.findById(req.params.id);
        if (!emotion) {
            return res.status(404).json({ message: 'Émotion non trouvée' });
        }
        await Emotion.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Émotion supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer plusieurs émotions par IDs
exports.deleteEmotionsByIds = async (req, res) => {
    try {
        const { ids } = req.body;
        await Emotion.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Émotions supprimées avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
