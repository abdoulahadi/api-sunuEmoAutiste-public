const mongoose = require('mongoose');
const GameSession = require('../models/GameSession');



// Get Average Play Time per Day for a User
exports.getAveragePlayTimePerDay = async (req, res) => {
    const { user_id } = req.params;
    
    try {
        console.log("Received user_id: ", user_id);

        // Vérification si user_id est un ObjectId valide
        let matchCondition;
        if (mongoose.Types.ObjectId.isValid(user_id)) {
            matchCondition = { user_id: new mongoose.Types.ObjectId(user_id) };
        } else {
            matchCondition = { user_id }; // Si user_id est une chaîne
        }

        const sessions = await GameSession.aggregate([
            {
                $match: matchCondition // Match user_id, ObjectId ou chaîne
            },
            {
                $group: {
                    _id: "$date", // Groupement par date
                    totalDuration: { $sum: "$duration" }, // Somme des durées pour chaque jour
                    count: { $sum: 1 } // Nombre de sessions par jour
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    averageDuration: { $divide: ["$totalDuration", "$count"] } // Calcul de la moyenne
                }
            },
            {
                $sort: { date: 1 } // Tri par date (facultatif)
            }
        ]);

        if (!sessions.length) {
            return res.status(404).json({
                status: 'error',
                message: 'No game sessions found for the user',
                data: {}
            });
        }

        res.status(200).json(sessions);
    } catch (err) {
        console.error("Error fetching average play time: ", err);
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        });
    }
};

exports.getAllPlayTime = async (req, res) => {
    const { user_id } = req.params;
    
    try {
        console.log("Received user_id for getAllPlayTime: ", user_id);

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid user_id format',
                data: null
            });
        }

        const result = await GameSession.aggregate([
            {
                $match: { user_id: new mongoose.Types.ObjectId(user_id) }
            },
            {
                $group: {
                    _id: null,
                    totalPlayTime: { $sum: "$duration" }
                }
            }
        ]);

        if (!result.length) {
            return res.status(404).json({
                status: 'error',
                message: 'No game sessions found for the user',
                data: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Total play time retrieved successfully',
            data: result[0].totalPlayTime
        });
    } catch (err) {
        console.error("Error fetching total play time: ", err);
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: null
        });
    }
};


// Create a new Game Session
exports.createGameSession = (req, res) => {
    const { user_id, duration, date } = req.body;
    console.log(user_id)

    if (!user_id || !duration || !date) {
        return res.status(400).json({
            status: 'error',
            message: 'Please enter all fields',
            data: {}
        });
    }

    const newGameSession = new GameSession({ user_id, duration, date });

    newGameSession.save()
        .then(gameSession => {
            res.status(201).json(gameSession.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get a Game Session by ID
exports.getGameSessionById = (req, res) => {
    const { id } = req.params;

    GameSession.findById(id)
        .populate('user_id', 'username email')  // Populate to get user details (optional)
        .then(gameSession => {
            if (!gameSession) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Game session not found',
                    data: {}
                });
            }
            res.status(200).json(gameSession.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get all Game Sessions
exports.getAllGameSessions = async (req, res) => {
    const { q, range, sort } = req.query;

    const parsedRange = range ? JSON.parse(range) : [0, 10];
    const parsedSort = sort ? JSON.parse(sort) : ["_id", "ASC"];

    const _start = parsedRange[0];
    const _end = parsedRange[1];
    const _sort = parsedSort[0];
    const _order = parsedSort[1];

    const filter = q ? { $or: [{ user_id: new RegExp(q, 'i') }] } : {};

    try {
        const gameSessions = await GameSession.find(filter)
            .sort({ [_sort]: _order === 'ASC' ? 1 : -1 })
            .skip(parseInt(_start))
            .limit(parseInt(_end) - parseInt(_start))
            .populate('user_id', 'username email'); 
        const totalGameSessions = await GameSession.countDocuments(filter);

        res.set('Content-Range', `game_sessions ${_start}-${_end}/${totalGameSessions}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(gameSessions.map(gameSession => gameSession.toJSON()));
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};

// Update a Game Session by ID
exports.updateGameSession = (req, res) => {
    const { id } = req.params;
    const { user_id, duration, date } = req.body;

    let gameSessionFields = {};
    if (user_id) gameSessionFields.user_id = user_id;
    if (duration) gameSessionFields.duration = duration;
    if (date) gameSessionFields.date = date;

    GameSession.findByIdAndUpdate(
        id,
        { $set: gameSessionFields },
        { new: true }
    )
        .then(gameSession => {
            if (!gameSession) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Game session not found',
                    data: {}
                });
            }
            res.status(200).json(gameSession.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Delete a Game Session by ID
exports.deleteGameSession = (req, res) => {
    const { id } = req.params;

    GameSession.findByIdAndDelete(id)
        .then(gameSession => {
            if (!gameSession) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Game session not found',
                    data: {}
                });
            }
            res.status(200).json(gameSession.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};
