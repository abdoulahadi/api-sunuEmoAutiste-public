const Image = require('../models/Image');
const Emotion = require('../models/Emotion');
const fs = require('fs-extra');
const path = require('path');

// Créer des images et les associer à une émotion
exports.createImages = async (req, res) => {
    const { EmotionID, Niveau } = req.body;
    try {
        // Vérifier si l'émotion existe
        const emotion = await Emotion.findById(EmotionID);
        if (!emotion) {
            return res.status(404).json({ message: 'Émotion non trouvée' });
        }

        // Enregistrer chaque fichier d'image dans la base de données
        const images = req.files.map(file => ({
            ImagePath: `/uploads/emotions/${file.filename}`,
            EmotionID,
            Niveau
        }));
        
        const newImages = await Image.insertMany(images);
        res.status(201).json(newImages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtenir toutes les images avec pagination, tri et filtrage
// exports.getAllImages = async (req, res) => {
//     const { sort = 'id', range = '[0,9]', filter = '{}' } = req.query;
//     const [sortField, sortOrder] = JSON.parse(sort);
//     const [rangeStart, rangeEnd] = JSON.parse(range);
//     const filters = JSON.parse(filter);

//     const limit = rangeEnd - rangeStart + 1;
//     const skip = rangeStart;

//     try {
//         const total = await Image.countDocuments(filters);
//         const images = await Image.find(filters)
//             .sort({ [sortField]: sortOrder === 'ASC' ? 1 : -1 })
//             .skip(skip)
//             .limit(limit)
//             .populate('EmotionID');

//         res.set('Content-Range', `images ${rangeStart}-${rangeEnd}/${total}`);
//         res.status(200).json(images);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

exports.getAllImages = async (req, res) => {
    const { filter, range, sort } = req.query;

    // Parse the filter, range, and sort from the query string
    const parsedFilter = filter ? JSON.parse(filter) : {};
    const parsedRange = range ? JSON.parse(range) : [0, 10];
    const parsedSort = sort ? JSON.parse(sort) : ["_id", "ASC"];

    const _start = parsedRange[0];
    const _end = parsedRange[1];
    const _sort = parsedSort[0];
    const _order = parsedSort[1];
    if (parsedFilter.id) {
        parsedFilter._id = { $in: parsedFilter.id };
        delete parsedFilter.id;
    }
    console.log(parsedFilter)

    try {
        // Apply filters, sort, range, and limit based on parsed parameters
        const images = await Image.find(parsedFilter)
            .populate({
                path: 'EmotionID',
                model: 'emotions'
            })
            .sort({ [_sort]: _order === 'ASC' ? 1 : -1 })
            .skip(_start)
            .limit(_end - _start);

        // Count the total number of documents matching the filter
        const totalImages = await Image.countDocuments(parsedFilter);

        // Transform images for the response
        const transformedImages = images.map(image => ({
            ImagePath: image.ImagePath,
            id: image._id,
            EmotionID: {
                id: image.EmotionID._id,
                EmotionName: image.EmotionID.EmotionName,
            },
            Niveau: image.Niveau
        }));

        // Set headers and send the response
        res.set('Content-Range', `images ${_start}-${_end}/${totalImages}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(transformedImages);
    } catch (err) {
        console.error('Error fetching images from database:', err);
        res.status(500).json({ message: err.message });
    }
};




// Obtenir une image par ID
exports.getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id).populate('EmotionID');
        if (!image) {
            return res.status(404).json({ message: 'Image non trouvée' });
        }
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtenir des images par EmotionID
exports.getImagesByEmotionId = async (req, res) => {
    try {
        const images = await Image.find({ EmotionID: req.params.emotionId }).populate('EmotionID');
        if (images.length === 0) {
            return res.status(404).json({ message: 'Images non trouvées pour cette émotion' });
        }
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mettre à jour une image par ID
// exports.updateImageById = async (req, res) => {
//     try {
//         const { ImagePath, EmotionID } = req.body;
//         let image = await Image.findById(req.params.id);
//         if (!image) {
//             return res.status(404).json({ message: 'Image non trouvée' });
//         }

//         image.ImagePath = ImagePath;
//         image.EmotionID = EmotionID;

//         image = await image.save();
//         res.status(200).json(image);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

exports.updateImage = async (req, res) => {
    const { id } = req.params;
    const { EmotionID } = req.body;
    try {
        // Vérifier si l'émotion existe
        const emotion = await Emotion.findById(EmotionID);
        if (!emotion) {
            return res.status(404).json({ message: 'Émotion non trouvée' });
        }

        // Trouver l'image existante
        const existingImage = await Image.findById(id);
        if (!existingImage) {
            return res.status(404).json({ message: 'Image non trouvée' });
        }

        // Mise à jour de l'image
        const updateData = { EmotionID };
        if (req.file) {
            // Supprimer l'ancienne image du système de fichiers
            const oldImagePath = path.join(__dirname, '..', existingImage.ImagePath);
            await fs.remove(oldImagePath);

            // Mettre à jour le chemin de la nouvelle image
            updateData.ImagePath = `/uploads/emotions/${req.file.filename}`;
        }

        const updatedImage = await Image.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedImage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer une image par ID
exports.deleteImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image non trouvée' });
        }

        // Supprimer le fichier du système de fichiers
        const filePath = path.join(__dirname, '..', image.ImagePath);
        await fs.unlink(filePath);

        // Supprimer le document de la base de données
        await Image.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Image supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer plusieurs images par IDs
exports.deleteImagesByIds = async (req, res) => {
    try {
        const { ids } = req.body;
        const images = await Image.find({ _id: { $in: ids } });

        if (!images || images.length === 0) {
            return res.status(404).json({ message: 'Images non trouvées' });
        }

        const deletePromises = images.map(async image => {
            const filePath = path.join(__dirname, '..', image.ImagePath);
            await fs.unlink(filePath);
            await Image.deleteOne({ _id: image._id });
        });

        await Promise.all(deletePromises);
        res.status(200).json({ message: 'Images supprimées avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
