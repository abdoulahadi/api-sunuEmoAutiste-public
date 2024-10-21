const Jeu3Intrus = require('../models/Jeu3Intrus');

// Create a new Jeu3Intrus
exports.createJeu3Intrus = (req, res) => {
    const { GameID, Image1ID, Image2ID, Image3ID, Niveau, CorrectIntrusPosition } = req.body;

    if (!GameID || !Image1ID || !Image2ID || !Image3ID || !CorrectIntrusPosition || !Niveau) {
        return res.status(400).json({
            status: 'error',
            message: 'Please enter all fields',
            data: {}
        });
    }

    const newJeu3Intrus = new Jeu3Intrus({ GameID, Image1ID, Image2ID, Image3ID, Niveau, CorrectIntrusPosition });

    newJeu3Intrus.save()
        .then(jeu3Intrus => {
            res.status(201).json(jeu3Intrus.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get a Jeu3Intrus by ID
exports.getJeu3IntrusById = (req, res) => {
    const { id } = req.params;

    Jeu3Intrus.findById(id)
        .then(jeu3Intrus => {
            if (!jeu3Intrus) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu3Intrus not found',
                    data: {}
                });
            }
            res.status(200).json(jeu3Intrus.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get all Jeu3Intrus
exports.getAllJeu3Intrus = async (req, res) => {
    const { _start, _end, _sort, _order, q } = req.query;

    const filter = q ? { $or: [{ CorrectIntrusPosition: new RegExp(q, 'i') }] } : {};

    try {
        const jeu3Intrus = await Jeu3Intrus.find(filter)
            .populate({
                path: 'Image1ID Image2ID Image3ID',
                populate: {
                path: 'EmotionID',
                model: 'emotions'
                }
            })
            .sort({ [_sort]: _order === 'ASC' ? 1 : -1 })
            .skip(parseInt(_start))
            .limit(parseInt(_end) - parseInt(_start));
        const totalJeu3Intrus = await Jeu3Intrus.countDocuments(filter);

        res.set('Content-Range', `jeu3intrus ${_start}-${_end}/${totalJeu3Intrus}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(jeu3Intrus.map(intrus => intrus.toJSON()));
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};

// Update a Jeu3Intrus by ID
exports.updateJeu3Intrus = (req, res) => {
    const { id } = req.params;
    const { GameID, Image1ID, Image2ID, Image3ID, Niveau, CorrectIntrusPosition } = req.body;

    let intrusFields = {};
    if (GameID) intrusFields.GameID = GameID;
    if (Image1ID) intrusFields.Image1ID = Image1ID;
    if (Image2ID) intrusFields.Image2ID = Image2ID;
    if (Image3ID) intrusFields.Image3ID = Image3ID;
    if (Niveau) intrusFields.Niveau = Niveau;
    if (CorrectIntrusPosition) intrusFields.CorrectIntrusPosition = CorrectIntrusPosition;

    Jeu3Intrus.findByIdAndUpdate(
        id,
        { $set: intrusFields },
        { new: true }
    )
        .then(jeu3Intrus => {
            if (!jeu3Intrus) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu3Intrus not found',
                    data: {}
                });
            }
            res.status(200).json(jeu3Intrus.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Delete a Jeu3Intrus by ID
exports.deleteJeu3Intrus = (req, res) => {
    const { id } = req.params;

    Jeu3Intrus.findByIdAndDelete(id)
        .then(jeu3Intrus => {
            if (!jeu3Intrus) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu3Intrus not found',
                    data: {}
                });
            }
            res.status(200).json(jeu3Intrus.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};
