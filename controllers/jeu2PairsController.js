const Jeu2Pair = require('../models/Jeu2Pairs');

// Create a new Jeu2Pair
exports.createJeu2Pair = (req, res) => {
    const { GameID, Image1ID, Image2ID, Niveau } = req.body;

    if (!GameID || !Image1ID || !Image2ID || !Niveau) {
        return res.status(400).json({
            status: 'error',
            message: 'Please enter all fields',
            data: {}
        });
    }

    const newJeu2Pair = new Jeu2Pair({ GameID, Image1ID, Image2ID, Niveau });

    newJeu2Pair.save()
        .then(jeu2Pair => {
            res.status(201).json(jeu2Pair.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get a Jeu2Pair by ID
exports.getJeu2PairById = (req, res) => {
    const { id } = req.params;

    Jeu2Pair.findById(id)
        .then(jeu2Pair => {
            if (!jeu2Pair) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu2Pair not found',
                    data: {}
                });
            }
            res.status(200).json(jeu2Pair.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get all Jeu2Pairs
exports.getAllJeu2Pairs = async (req, res) => {
    const { q, range, sort } = req.query;

    // Parse the filter, range, and sort from the query string
    const parsedRange = range ? JSON.parse(range) : [0, 10];
    const parsedSort = sort ? JSON.parse(sort) : ["_id", "ASC"];

    const _start = parsedRange[0];
    const _end = parsedRange[1];
    const _sort = parsedSort[0];
    const _order = parsedSort[1];

     // Récupérer le niveau du filtre s'il est spécifié
     const niveau = req.query.filter ? req.query.filter['Niveau'] : null;

     // Construire le filtre
     const filter = {
         ...((q) ? { $or: [{ GameID: new RegExp(q, 'i') }] } : {}),
         ...((niveau) ? { Niveau: niveau } : {})
     };

    try {
        const jeu2Pairs = await Jeu2Pair.find(filter)
        .populate({
            path: 'Image1ID Image2ID',
            populate: {
              path: 'EmotionID',
              model: 'emotions'
            }
          })
            .sort({ [_sort]: _order === 'ASC' ? 1 : -1 })
            .skip(parseInt(_start))
            .limit(parseInt(_end) - parseInt(_start));
        const totalJeu2Pairs = await Jeu2Pair.countDocuments(filter);

        res.set('Content-Range', `jeu2pairs ${_start}-${_end}/${totalJeu2Pairs}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(jeu2Pairs.map(pair => pair.toJSON()));
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};

// Update a Jeu2Pair by ID
exports.updateJeu2Pair = (req, res) => {
    const { id } = req.params;
    const { GameID, Image1ID, Image2ID, Niveau } = req.body;

    let pairFields = {};
    if (GameID) pairFields.GameID = GameID;
    if (Image1ID) pairFields.Image1ID = Image1ID;
    if (Image2ID) pairFields.Image2ID = Image2ID;
    if (Niveau) pairFields.Niveau = Niveau;

    Jeu2Pair.findByIdAndUpdate(
        id,
        { $set: pairFields },
        { new: true }
    )
        .then(jeu2Pair => {
            if (!jeu2Pair) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu2Pair not found',
                    data: {}
                });
            }
            res.status(200).json(jeu2Pair.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Delete a Jeu2Pair by ID
exports.deleteJeu2Pair = (req, res) => {
    const { id } = req.params;

    Jeu2Pair.findByIdAndDelete(id)
        .then(jeu2Pair => {
            if (!jeu2Pair) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu2Pair not found',
                    data: {}
                });
            }
            res.status(200).json(jeu2Pair.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};
