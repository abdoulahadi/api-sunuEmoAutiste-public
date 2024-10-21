const Jeu4Match = require('../models/Jeu4Match');

// Create a new Jeu4Match
exports.createJeu4Match = (req, res) => {
    const { GameID, MainImageID, Option1ImageID, Option2ImageID, CorrectOptionPosition, Niveau } = req.body;

    if (!GameID || !MainImageID || !Option1ImageID || !Option2ImageID || !CorrectOptionPosition || !Niveau) {
        return res.status(400).json({
            status: 'error',
            message: 'Please enter all fields',
            data: {}
        });
    }

    const newJeu4Match = new Jeu4Match({ GameID, MainImageID, Option1ImageID, Option2ImageID, CorrectOptionPosition, Niveau });

    newJeu4Match.save()
        .then(jeu4Match => {
            res.status(201).json(jeu4Match.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get a Jeu4Match by ID
exports.getJeu4MatchById = (req, res) => {
    const { id } = req.params;

    Jeu4Match.findById(id)
        .then(jeu4Match => {
            if (!jeu4Match) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu4Match not found',
                    data: {}
                });
            }
            res.status(200).json(jeu4Match.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get all Jeu4Matches
exports.getAllJeu4Matches = async (req, res) => {
    const { _start, _end, _sort, _order, q } = req.query;

    const filter = q ? { $or: [{ CorrectOptionPosition: new RegExp(q, 'i') }] } : {};

    try {
        const jeu4Matches = await Jeu4Match.find(filter)
        .populate({
            path: 'MainImageID Option1ImageID Option2ImageID',
            populate: {
              path: 'EmotionID',
              model: 'emotions'
            }
          })
            .sort({ [_sort]: _order === 'ASC' ? 1 : -1 })
            .skip(parseInt(_start))
            .limit(parseInt(_end) - parseInt(_start));
        const totalJeu4Matches = await Jeu4Match.countDocuments(filter);

        res.set('Content-Range', `jeu4matches ${_start}-${_end}/${totalJeu4Matches}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(jeu4Matches.map(match => match.toJSON()));
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};

// Update a Jeu4Match by ID
exports.updateJeu4Match = (req, res) => {
    const { id } = req.params;
    const { GameID, MainImageID, Option1ImageID, Option2ImageID, Niveau, CorrectOptionPosition } = req.body;

    let matchFields = {};
    if (GameID) matchFields.GameID = GameID;
    if (MainImageID) matchFields.MainImageID = MainImageID;
    if (Option1ImageID) matchFields.Option1ImageID = Option1ImageID;
    if (Option2ImageID) matchFields.Option2ImageID = Option2ImageID;
    if (Niveau) matchFields.Niveau = Niveau;
    if (CorrectOptionPosition) matchFields.CorrectOptionPosition = CorrectOptionPosition;

    Jeu4Match.findByIdAndUpdate(
        id,
        { $set: matchFields },
        { new: true }
    )
        .then(jeu4Match => {
            if (!jeu4Match) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu4Match not found',
                    data: {}
                });
            }
            res.status(200).json(jeu4Match.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Delete a Jeu4Match by ID
exports.deleteJeu4Match = (req, res) => {
    const { id } = req.params;

    Jeu4Match.findByIdAndDelete(id)
        .then(jeu4Match => {
            if (!jeu4Match) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu4Match not found',
                    data: {}
                });
            }
            res.status(200).json(jeu4Match.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};
