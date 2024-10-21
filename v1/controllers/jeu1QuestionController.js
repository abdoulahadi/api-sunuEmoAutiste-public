const Jeu1Question = require('../models/Jeu1Question');

// Create a new Jeu1Question
exports.createJeu1Question = (req, res) => {
    const { GameID, Image1ID, Image2ID, Niveau, CorrectAnswer } = req.body;

    if (!GameID || !Image1ID || !Image2ID || !CorrectAnswer || !Niveau) {
        return res.status(400).json({
            status: 'error',
            message: 'Please enter all fields',
            data: {}
        });
    }

    const newJeu1Question = new Jeu1Question({ GameID, Image1ID, Image2ID, CorrectAnswer, Niveau });

    newJeu1Question.save()
        .then(jeu1Question => {
            res.status(201).json(jeu1Question.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get a Jeu1Question by ID
exports.getJeu1QuestionById = (req, res) => {
    const { id } = req.params;

    Jeu1Question.findById(id)
        .then(jeu1Question => {
            if (!jeu1Question) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu1Question not found',
                    data: {}
                });
            }
            res.status(200).json(jeu1Question.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get all Jeu1Questions
exports.getAllJeu1Questions = async (req, res) => {
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
         ...((q) ? { $or: [{ CorrectAnswer: new RegExp(q, 'i') }] } : {}),
         ...((niveau) ? { Niveau: niveau } : {})
     };

    try {
        const jeu1Questions = await Jeu1Question.find(filter)
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
        const totalJeu1Questions = await Jeu1Question.countDocuments(filter);

        res.set('Content-Range', `jeu1questions ${_start}-${_end}/${totalJeu1Questions}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(jeu1Questions.map(question => question.toJSON()));
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};

// Update a Jeu1Question by ID
exports.updateJeu1Question = (req, res) => {
    const { id } = req.params;
    const { GameID, Image1ID, Image2ID, Niveau, CorrectAnswer } = req.body;

    let questionFields = {};
    if (GameID) questionFields.GameID = GameID;
    if (Image1ID) questionFields.Image1ID = Image1ID;
    if (Image2ID) questionFields.Image2ID = Image2ID;
    if (Niveau) questionFields.Niveau = Niveau;
    if (CorrectAnswer) questionFields.CorrectAnswer = CorrectAnswer;

    Jeu1Question.findByIdAndUpdate(
        id,
        { $set: questionFields },
        { new: true }
    )
        .then(jeu1Question => {
            if (!jeu1Question) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu1Question not found',
                    data: {}
                });
            }
            res.status(200).json(jeu1Question.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Delete a Jeu1Question by ID
exports.deleteJeu1Question = (req, res) => {
    const { id } = req.params;

    Jeu1Question.findByIdAndDelete(id)
        .then(jeu1Question => {
            if (!jeu1Question) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jeu1Question not found',
                    data: {}
                });
            }
            res.status(200).json(jeu1Question.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};
