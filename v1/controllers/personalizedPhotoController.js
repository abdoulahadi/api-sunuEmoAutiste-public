const PersonalizedPhoto = require('../models/PersonalizedPhoto');

// Create a new Personalized Photo
exports.createPersonalizedPhoto = (req, res) => {
    const { ProfileID, ImageID, EmotionID } = req.body;

    if (!ProfileID || !ImageID || !EmotionID) {
        return res.status(400).json({
            status: 'error',
            message: 'Please enter all fields',
            data: {}
        });
    }

    const newPersonalizedPhoto = new PersonalizedPhoto({ ProfileID, ImageID, EmotionID });

    newPersonalizedPhoto.save()
        .then(personalizedPhoto => {
            res.status(201).json(personalizedPhoto.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get a Personalized Photo by ID
exports.getPersonalizedPhotoById = (req, res) => {
    const { id } = req.params;

    PersonalizedPhoto.findById(id)
        .populate('ProfileID')
        .populate('ImageID')
        .populate('EmotionID')
        .then(personalizedPhoto => {
            if (!personalizedPhoto) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Personalized Photo not found',
                    data: {}
                });
            }
            res.status(200).json(personalizedPhoto.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get all Personalized Photos
exports.getAllPersonalizedPhotos = async (req, res) => {
    const { _start, _end, _sort, _order, q } = req.query;

    const filter = q ? { $or: [{ ProfileID: new RegExp(q, 'i') }] } : {};

    try {
        const personalizedPhotos = await PersonalizedPhoto.find(filter)
            .populate('ProfileID')
            .populate('ImageID')
            .populate('EmotionID')
            .sort({ [_sort]: _order === 'ASC' ? 1 : -1 })
            .skip(parseInt(_start))
            .limit(parseInt(_end) - parseInt(_start));
        const totalPersonalizedPhotos = await PersonalizedPhoto.countDocuments(filter);

        res.set('Content-Range', `personalizedphotos ${_start}-${_end}/${totalPersonalizedPhotos}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(personalizedPhotos.map(photo => photo.toJSON()));
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};

// Update a Personalized Photo by ID
exports.updatePersonalizedPhoto = (req, res) => {
    const { id } = req.params;
    const { ProfileID, ImageID, EmotionID } = req.body;

    let photoFields = {};
    if (ProfileID) photoFields.ProfileID = ProfileID;
    if (ImageID) photoFields.ImageID = ImageID;
    if (EmotionID) photoFields.EmotionID = EmotionID;

    PersonalizedPhoto.findByIdAndUpdate(
        id,
        { $set: photoFields },
        { new: true }
    )
        .then(personalizedPhoto => {
            if (!personalizedPhoto) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Personalized Photo not found',
                    data: {}
                });
            }
            res.status(200).json(personalizedPhoto.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Delete a Personalized Photo by ID
exports.deletePersonalizedPhoto = (req, res) => {
    const { id } = req.params;

    PersonalizedPhoto.findByIdAndDelete(id)
        .then(personalizedPhoto => {
            if (!personalizedPhoto) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Personalized Photo not found',
                    data: {}
                });
            }
            res.status(200).json(personalizedPhoto.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};


// Get all Images of a Profile sorted by Emotions
exports.getImagesByProfileSortedByEmotion = async (req, res) => {
    const { profileId } = req.params;

    if (!profileId) {
        return res.status(400).json({
            status: 'error',
            message: 'Profile ID is required',
            data: {}
        });
    }

    try {
        // Rechercher toutes les photos personnalisées de l'utilisateur
        const personalizedPhotos = await PersonalizedPhoto.find({
            ProfileID: profileId
        })
        .populate('ImageID')
        .populate('EmotionID')
        .sort({ EmotionID: 1 });

        // Grouper les images par émotion
        const imagesByEmotion = personalizedPhotos.reduce((acc, photo) => {
            const emotion = photo.EmotionID.EmotionName; 
            if (!acc[emotion]) {
                acc[emotion] = [];
            }
            acc[emotion].push({
                ...photo.ImageID.toJSON(),
                personalizedPhotoId: photo._id // Inclure l'ID du PersonalizedPhoto
            }); 
            return acc;
        }, {});

        res.status(200).json(imagesByEmotion);
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Server error ' + err.message,
            data: {}
        });
    }
};